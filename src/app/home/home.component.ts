import {Component, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {AddEmployeeFormComponent} from '../components/add-employee-form/add-employee-form.component';
import {EmployeesTableComponent} from '../components/employees-table/employees-table.component';
import {GalleriaModule} from 'primeng/galleria';
import {Carousel} from 'primeng/carousel';

@Component({
  selector: 'app-home',
  imports: [
    GalleriaModule,
    Carousel
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1001',
      code: 'nvklal433',
      name: 'Black Watch',
      description: 'Product Description',
      image: 'black-watch.jpg',
      price: 72,
      category: 'Accessories',
      quantity: 61,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 4
    },
    {
      id: '1002',
      code: 'zz21cz3c1',
      name: 'Blue Band',
      description: 'Product Description',
      image: 'blue-band.jpg',
      price: 79,
      category: 'Fitness',
      quantity: 2,
      inventoryStatus: 'LOWSTOCK',
      rating: 3
    },
  ];
}
