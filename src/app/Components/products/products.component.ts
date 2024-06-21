import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Models/product.model';
import {Router, RouterLink} from '@angular/router';
import  $ from 'jquery';
import 'datatables.net';
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    RouterLink
  ],
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewInit {

  products: Product[] = [];
  table: any;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    (window as any).editProduct = this.editProduct.bind(this);
    (window as any).deleteProduct = this.deleteProduct.bind(this);
  }

  ngAfterViewInit(): void {
    this.initializeDataTable();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
        this.reinitializeDataTable();
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  initializeDataTable(): void {
    this.table = $('#productsTable').DataTable({
      paging: true,
      searching: true,
      ordering: true
    });
  }

  reinitializeDataTable(): void {
    this.table.clear();
    this.products.forEach(product => {
      const createdAt = product.created_At ? new Date(product.created_At).toLocaleString() : '';
      const updatedAt = product.updated_At ? new Date(product.updated_At).toLocaleString() : '';
      this.table.row.add([
        product.product_Id,
        product.product_Name,
        product.description,
        product.price,
        product.quantity,
        createdAt,
        updatedAt,
        `<button class="btn btn-sm btn-primary" onclick="editProduct(${product.product_Id})">Edit</button>
         <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.product_Id})">Delete</button>`
      ]).draw();
    });
  }

  editProduct(productId: number): void {
    this.router.navigate(['/update-product', productId]);
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          this.products = this.products.filter(product => product.product_Id !== productId);
          this.reinitializeDataTable(); // Update DataTable after deletion
        },
        error => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }
}
