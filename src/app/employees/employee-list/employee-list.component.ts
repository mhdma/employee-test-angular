
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { IEmployee } from '../employee.model';

import { EmployeeService } from "../../services/employee.service";

//import { ToastrService } from "../../service/toastr.service";

@Component({
   templateUrl: './employee-list.component.html',
   styles: [`
      td button {
         margin-right: 10px;
      }
   `]
})
export class EmployeeListComponent implements OnInit {
   EmployeeForm: boolean;
   isNewEmployee: boolean;
   newEmployee: any = {};
   editEmployeeForm: boolean;
   editedEmployee: any = {};
   employees: IEmployee[];

   constructor(
      private employeeService: EmployeeService,
      //  private toastr: ToastrService,
   ) { }


   ngOnInit() {
      // get all employees
      this.employeeService
         .getEmployees()
         .subscribe(employees => {
            this.employees = employees
         })
   }

   delete(id: number) {
      this.employeeService
         .deleteEmployee(id)
         .subscribe(() => {
            // update component
            this.employees = this.employees.filter(emp => emp.Id !== id)
            //this.toastr.success("Deleted successfully");
         })
   }
   showEditUserForm(emp: IEmployee) {
      if (!emp) {
         this.EmployeeForm = false;
         return;
      }
      this.editEmployeeForm = true;
      this.editedEmployee = emp;
   }

   showAddUserForm() {
      // resets form if edited user
      if (this.employees.length) {
         this.newEmployee = {};
      }
      this.EmployeeForm = true;
      this.isNewEmployee = true;

   }

   //---

   removeEmployee(emp: IEmployee) {
      this.employeeService.deleteEmployee(emp.Id)
         .subscribe((response: any) => {
            console.log(response);

            this.employeeService.getEmployees().subscribe();
            this.ngOnInit();
         });
   }
   saveEmployee(user: IEmployee) {
      if (this.isNewEmployee) {
         // add a new user
         this.employeeService.addEmployee(user)
            .subscribe((response: any) => {
               console.log(response);

               this.employeeService.getEmployees().subscribe();
               this.ngOnInit();
            });;
      }
      this.EmployeeForm = false;
   }

   updateEmployee() {
      this.employeeService.updateEmployee(this.editedEmployee.Id, this.editedEmployee).subscribe((response: any) => {
         console.log(response);
         this.ngOnInit();
         this.employeeService.getEmployees().subscribe();
      });
      this.editEmployeeForm = false;
      this.editedEmployee = {};
   }
   cancelEdits() {
      this.editedEmployee = {};
      this.editEmployeeForm = false;
   }

   cancelNewEmployee() {
      this.newEmployee = {};
      this.EmployeeForm = false;
   }
}