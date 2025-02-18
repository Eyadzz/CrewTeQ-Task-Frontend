import {Component, ViewChild} from '@angular/core';
import {AddEmployeeFormComponent} from '../components/add-employee-form/add-employee-form.component';
import {EmployeesTableComponent} from '../components/employees-table/employees-table.component';

@Component({
  selector: 'app-employees',
  imports: [
    AddEmployeeFormComponent,
    EmployeesTableComponent
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  @ViewChild(EmployeesTableComponent) employeesTable!: EmployeesTableComponent;

  refreshEmployees() {
    this.employeesTable.fetchEmployees();
  }
}
