import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StorageService {
  employeesChanged = new Subject<Employee[]>();
  private employees: Employee[] = [];

  getEmployees() {
    return this.employees.slice();
  }

  addEmployee(employee: Employee) {
    this.employees.push(employee);

    return this.employeesChanged.next(this.employees.slice());
  }
}
