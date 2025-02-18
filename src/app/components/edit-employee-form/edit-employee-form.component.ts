import {Component, Input, OnInit, inject, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { Checkbox } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { EmployeesService } from '../../services/employees.service';
import { Employee } from '../../models/employee.type';

@Component({
  selector: 'app-edit-employee-form',
  standalone: true,
  imports: [Button, FormsModule, Dialog, InputText, Checkbox],
  templateUrl: './edit-employee-form.component.html',
  styleUrl: './edit-employee-form.component.css',
  providers: [MessageService],
})
export class EditEmployeeFormComponent implements OnInit {
  @Input() showDialog: boolean = false;
  @Input() employee: Employee | null = null;

  firstName: string = '';
  lastName: string = '';
  username: string = '';
  isActive: boolean = false;

  employeeService = inject(EmployeesService);
  messageService = inject(MessageService);

  ngOnInit(): void {
    if (this.employee) {
      console.log(this.employee);
      this.firstName = this.employee.firstName;
      this.lastName = this.employee.lastName;
      this.username = this.employee.username;
      this.isActive = this.employee.isActive;
    }
    else
      console.log("not here")
  }

  save() {
    const updatedEmployee: Employee = {
      id: this.employee?.id || 0,
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      isActive: this.isActive,
    };

    this.employeeService.updateEmployee(updatedEmployee).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee updated successfully!' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save employee data.' });
      },
    });
  }

  resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.isActive = false;
  }
}
