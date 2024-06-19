import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {ProductService} from "../../Services/product.service";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  providers: [ProductService]
})
export class CreateProductComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      product_Name: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe(
        response => {
          console.log('Product created successfully!', response);
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Error creating product!', error);
        }
      );
    }
  }
}
