import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'employees',
    pathMatch: 'full',
    loadComponent: () => import('./employees/employees.component').then(m => m.EmployeesComponent)
  }
];
