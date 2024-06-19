import { Component } from '@angular/core';
import {ProductsComponent} from "../products/products.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
