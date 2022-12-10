import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { ToastrService } from 'src/app/shared/toastr.service';
import { IEmployee } from '../employee.model';
import { EmployeeService } from '../../services/employee.service';


@Component({
   templateUrl: './update-employee.component.html'
})
export class UpdateEmployeeComponent implements OnInit{

   employee: IEmployee;


   constructor(
      private employeeService: EmployeeService,
      private route: ActivatedRoute,
      private router: Router, 
     // private toastr: ToastrService,  
   ) {}

   ngOnInit() {
      const id =0;// +this.route.snapshot.paramMap.get('id')

     

      // get current employee details
      this.employeeService
         .getEmployee(id)
         .subscribe(employee => {
            this.employee = employee;
           
         })
   }

   onSubmit(formValues:any) {
      // add id field to formValues object
     // let id = +this.route.snapshot.paramMap.get('id');
      //formValues.id = id;
      //formValues.EmployeeTypeId = +formValues.EmployeeTypeId;
      //this.employeeService
       //  .updateEmployee(id, formValues)
        // .subscribe(() => {
         //   this.router.navigate(['/employees'])
          //  this.toastr.success("Updated successfully")
        // })
   }

}