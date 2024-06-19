import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../Models/transaction.model';
import { TransactionService } from '../../Services/transaction.service';
import { ProductService } from '../../Services/product.service';
import {DatePipe, NgForOf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  standalone: true,
  styleUrls: ['./transactions.component.css'],
  imports: [
    NgForOf,
    RouterLink
  ],
  providers: [DatePipe]
})
export class TransactionsComponent implements OnInit {

  transactions: Transaction[] = [];

  constructor(
    private transactionService: TransactionService,
    private productService: ProductService,
    private datePipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe(
      (transactions: Transaction[]) => {
        this.transactions = transactions;
        this.populateProductNames();
      },
      error => {
        console.error('Error fetching transactions:', error);
      }
    );
  }

  populateProductNames(): void {
    this.transactions.forEach(transaction => {
      this.productService.getProductById(transaction.product_Id).subscribe(
        product => {
          transaction.product_Name = product.product_Name;
        },
        error => {
          console.error(`Error fetching product for transaction ${transaction.transaction_Id}:`, error);
        }
      );
    });
  }

  formatTransactionDate(date: Date): string {
    return this.datePipe.transform(date, 'short') || '';
  }

  onDeleteTransaction(transactionId: number): void {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(transactionId).subscribe(
        () => {
          console.log(`Transaction with ID ${transactionId} deleted successfully.`);
          // Reload transactions after deletion
          this.loadTransactions();
        },
        error => {
          console.error(`Error deleting transaction with ID ${transactionId}:`, error);
        }
      );
    }
  }
}
