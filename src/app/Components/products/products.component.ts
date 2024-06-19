import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Models/product.model';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }
  editProduct(product: Product): void {
    // Navigate to the edit page with the product ID
    this.router.navigate(['/update-product', product.product_Id]);
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          this.products = this.products.filter(product => product.product_Id !== productId);
        },
        error => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }
}
