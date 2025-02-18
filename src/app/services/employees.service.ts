import {inject, Injectable} from '@angular/core';
import {Employee} from '../models/employee.type';
import {HttpClient} from '@angular/common/http';
import {AddEmployee} from '../models/add-employee.type';
import {Observable} from 'rxjs';
import {ListEmployees} from '../models/list-employees.type';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  apiUrl = 'http://localhost:5225/api';
  http = inject(HttpClient);
  employees : Employee[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      isActive: true
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      username: 'janedoe',
      isActive: false
    },
    {
      id: 3,
      firstName: 'Alice',
      lastName: 'Smith',
      username: 'alicesmith',
      isActive: true
    },
    {
      id: 4,
      firstName: 'Bob',
      lastName: 'Smith',
      username: 'bobsmith',
      isActive: true
    },
  ];

  getEmployees(payload: ListEmployees): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/Employee/List`, {params: payload});
  }

  addEmployee(employee: AddEmployee): Observable<any> {
    return this.http.post(`${this.apiUrl}/Employee`, employee);
  }

  deleteEmployee(employeeId: number) {
    return this.http.delete(`${this.apiUrl}/Employee`, {params: {Id: employeeId}});
  }

  updateEmployee(payload: Employee) {
    return this.http.put(`${this.apiUrl}/Employee`, payload);
  }
}
