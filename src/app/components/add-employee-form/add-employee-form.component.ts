import {Component, EventEmitter, inject, Output} from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {PlusIcon} from 'primeng/icons';
import {EmployeesService} from '../../services/employees.service';
import {Ripple} from 'primeng/ripple';

@Component({
  selector: 'app-add-employee-form',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    CommonModule,
    FormsModule,
    PlusIcon,
    Ripple,
  ],
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.css'],
  providers: [MessageService],
})
export class AddEmployeeFormComponent {
  visible: boolean = false;
  firstName: string = '';
  lastName: string = '';
  username: string = '';

  employeeService= inject(EmployeesService);
  messageService= inject(MessageService);

  @Output() employeeAdded = new EventEmitter<void>();

  showDialog() {
    this.visible = true;
  }

  add() {
    const payload = {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
    };

    this.employeeService.addEmployee(payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee data saved successfully!',
        });
        this.visible = false;
        this.resetForm();
        this.employeeAdded.emit();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to save employee data.',
        });
      },
    });
  }

  resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.username = '';
  }
}
