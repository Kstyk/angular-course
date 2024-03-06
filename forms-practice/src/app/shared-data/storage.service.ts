import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StorageService {
  employeesChanged = new Subject<Employee[]>();

  constructor(private http: HttpClient) {}

  addEmployee(employee: Employee) {
    // this.employees.push(employee);

    this.http
      .post(
        'https://angular-udemy-4be22-default-rtdb.firebaseio.com/applications.json',
        employee
      )
      .subscribe((response) => {
        console.log(response);
      });

    // return this.employeesChanged.next(this.employees.slice());
  }

  fetchEmployees() {
    return this.http
      .get<Employee[]>(
        'https://angular-udemy-4be22-default-rtdb.firebaseio.com/applications.json'
      )
      .pipe(
        map((employs) => {
          const employees: Employee[] = [];

          console.log(employs);
          for (const key in employs) {
            if (employs.hasOwnProperty(key)) {
              employees.push({ ...employs[key] });
            }
          }
          return employees;
        })
      );
  }
}
