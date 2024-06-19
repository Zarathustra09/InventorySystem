import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ProductService } from '../../Services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../Models/product.model';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  productId: number = 0; // Initialize productId
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      product_Id: [''],
      product_Name: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) { // Check if id is not null
      this.productId = +id;
      this.getProduct(this.productId);
    }
  }

  getProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      (product: Product) => {
        this.productForm.patchValue(product);
      },
      error => {
        console.error('Error fetching product:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const updatedProduct: Product = this.productForm.value;
      this.productService.updateProduct(this.productId, updatedProduct).subscribe(
        () => {
          console.log('Product updated successfully!');
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Error updating product:', error);
        }
      );
    }
  }
}
