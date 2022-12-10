import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";

import { IEmployee } from "../employees/employee.model";
import { environment } from 'src/environments/environment';
const httpOptions = {
   headers: new HttpHeaders({
      'Content-Type': 'application/json'
   })
}

@Injectable({
   providedIn: 'root'
})
export class EmployeeService {
   private readonly apiUrl = `${environment.apiUrl}api/employee`;


   constructor(private http: HttpClient) { }

   // GET - get all employees 
   getEmployees(): Observable<IEmployee[]> {
      return this.http.get<IEmployee[]>(this.apiUrl+"/GetEmployees")
         .pipe(
            catchError(this.handleError)
         );
   }

   // GET - get a single employee using id
   getEmployee(id: number): Observable<IEmployee> {
      const url = `${this.apiUrl}/${id}`
      return this.http.get<IEmployee>(url)
         .pipe(
            catchError(this.handleError)
         );
   }

   // POST - add a new employee
   addEmployee(employee: IEmployee): Observable<IEmployee> {
      var url=this.apiUrl+"/AddEmployee";
      return this.http.post<IEmployee>(url, employee, httpOptions)
      .pipe(
         catchError(this.handleError)
      )
   }

   // PUT - update an employee
   updateEmployee(id: number, update: IEmployee): Observable<IEmployee> {
      const url = this.apiUrl+"/PutEmployee?Id="+id;
      return this.http.put<IEmployee>(url, update, httpOptions)
         .pipe(
            catchError(this.handleError)
         );
   }

   // DELETE - delete an employee
   deleteEmployee(id: number): Observable<{}> {
      const url = this.apiUrl+"/DeleteEmployee?Id="+id;
      return this.http.delete(url, httpOptions)
         .pipe(
            catchError(this.handleError)
         );
   }

   private handleError(error: HttpErrorResponse) {
      console.log("err")
      if (error.error instanceof ErrorEvent) {
         // A client-side or network error occurred.
         console.error('An error occurred:', error.error.message);
      } else {
         // Server error
         console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
      }
      return throwError(
         'Something bad happened; please try again later.');
   }
}