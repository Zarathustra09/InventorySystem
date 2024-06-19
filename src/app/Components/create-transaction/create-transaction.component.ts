import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionService } from '../../Services/transaction.service';
import { ProductService } from '../../Services/product.service'; // Import ProductService
import { Transaction } from '../../Models/transaction.model';
import { Product } from '../../Models/product.model'; // Import Product model
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor
  ],
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent implements OnInit {

  transactionForm: FormGroup;
  products: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private productService: ProductService, // Inject ProductService
    private router: Router
  ) {
    this.transactionForm = this.fb.group({
      product_Id: ['', Validators.required],
      transaction_Type: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      transaction_Date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const formValue = this.transactionForm.value;


      const newTransaction: Transaction = {
        // @ts-ignore
        transaction_Id: null,
        product_Id: formValue.product_Id,
        transaction_Type: formValue.transaction_Type,
        quantity: formValue.quantity,
        transaction_Date: formValue.transaction_Date
      };

      console.log('New transaction:', newTransaction);

      this.transactionService.addTransaction(newTransaction).subscribe(
        () => {
          console.log('Transaction created successfully');
          this.router.navigate(['/transactions']);
        },
        error => {
          console.error('Error creating transaction:', error);
        }
      );
    }
  }
}
