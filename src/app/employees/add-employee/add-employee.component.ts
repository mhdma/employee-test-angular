import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { ToastrService } from 'src/app/service/ToastrService';
import { IEmployee } from '../employee.model';
import { EmployeeService } from "../../services/employee.service";


@Component({
   selector:"Add-employee",
   templateUrl: './add-employee.component.html'
})
export class AddEmployeeComponent implements OnInit {

   employee: IEmployee = {
      Id: 0,
      Name: "",
      Email: "",
      Phone: "",

   }
 
   constructor(
      private employeeService: EmployeeService,
      private router: Router,
    //  private toastr: ToastrService,
   ) { }

   ngOnInit() {
     
   }

   onSubmit(formValues :any) {
      this.employeeService
         .addEmployee(formValues)
         .subscribe(
            () => {
               this.router.navigate(['/employees'])
             //  this.toastr.success("Added new Employee");
            },
          //  (error) => this.toastr.error(error),
         )
   }
}