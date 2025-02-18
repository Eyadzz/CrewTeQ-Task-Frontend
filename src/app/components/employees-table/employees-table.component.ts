import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { EmployeesService } from '../../services/employees.service';
import { Employee } from '../../models/employee.type';
import { Button } from 'primeng/button';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { EditEmployeeFormComponent } from '../edit-employee-form/edit-employee-form.component';

@Component({
  selector: 'app-employees-table',
  standalone: true,
  imports: [TableModule, Button, ToggleSwitch, FormsModule, Toast, ConfirmDialog, EditEmployeeFormComponent],
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.css',
  providers: [ConfirmationService, MessageService]
})
export class EmployeesTableComponent implements OnInit {
  showEditEmployeeForm = signal(false);
  employeeToEdit = signal<Employee | null>(null);

  employeeService = inject(EmployeesService);
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);
  employeesList = signal<Employee[]>([]);

  ngOnInit(): void {
    this.fetchEmployees();
    this.employeeToEdit.set(this.employeesList()[0]);
  }

  fetchEmployees() {
    this.employeeService.getEmployees({ pageSize: 10, lastId: 0 }).subscribe({
      next: (employees) => this.employeesList.set(employees),
      error: (error) => console.error('Failed to fetch employees:', error),
    });
  }

  confirmDelete(event: Event, employeeId: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Confirm Delete',
      acceptButtonProps: { label: 'Delete', severity: 'danger' },
      rejectButtonProps: { label: 'Cancel', severity: 'secondary', outlined: true },
      accept: () => {
        this.employeeService.deleteEmployee(employeeId).subscribe({
          next: () => {
            this.messageService.add({ severity: 'info', summary: 'Deleted', detail: 'Record deleted' });
            this.fetchEmployees();
          },
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete' }),
        });
      }
    });
  }

  editEmployee($event: MouseEvent, employee: Employee) {
    this.employeeToEdit.set(employee);
    this.showEditEmployeeForm.set(true);
  }
}
