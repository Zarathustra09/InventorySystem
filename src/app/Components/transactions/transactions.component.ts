import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Transaction } from '../../Models/transaction.model';
import { TransactionService } from '../../Services/transaction.service';
import { ProductService } from '../../Services/product.service';
import {DatePipe, NgForOf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import  $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  standalone: true,
  styleUrls: ['./transactions.component.css'],
  imports: [
    RouterLink,
    NgForOf
  ],
  providers: [DatePipe]
})
export class TransactionsComponent implements OnInit, AfterViewInit {

  transactions: Transaction[] = [];
  table: any;

  constructor(
    private transactionService: TransactionService,
    private productService: ProductService,
    private datePipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTransactions();
    (window as any).deleteTransaction = this.deleteTransaction.bind(this);
  }

  ngAfterViewInit(): void {
    this.initializeDataTable();
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
    let remaining = this.transactions.length;
    this.transactions.forEach(transaction => {
      this.productService.getProductById(transaction.product_Id).subscribe(
        product => {
          transaction.product_Name = product.product_Name;
          remaining--;
          if (remaining === 0) {
            this.reinitializeDataTable();
          }
        },
        error => {
          console.error(`Error fetching product for transaction ${transaction.transaction_Id}:`, error);
          remaining--;
          if (remaining === 0) {
            this.reinitializeDataTable();
          }
        }
      );
    });
  }

  formatTransactionDate(date: Date): string {
    return this.datePipe.transform(date, 'short') || '';
  }

  initializeDataTable(): void {
    this.table = $('#transactionsTable').DataTable({
      paging: true,
      searching: true,
      ordering: true
    });
  }

  reinitializeDataTable(): void {
    if (this.table) {
      this.table.clear();
      this.transactions.forEach(transaction => {
        const transactionDate = transaction.transaction_Date ? new Date(transaction.transaction_Date).toLocaleString() : '';
        this.table.row.add([
          transaction.transaction_Id,
          transaction.product_Name,
          transaction.transaction_Type,
          transaction.quantity,
          transactionDate,
          `<button class="btn btn-sm btn-danger" onclick="deleteTransaction(${transaction.transaction_Id})">Delete</button>`
        ]).draw();
      });
    }
  }

  deleteTransaction(transactionId: number): void {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(transactionId).subscribe(
        () => {
          console.log(`Transaction with ID ${transactionId} deleted successfully.`);
          this.transactions = this.transactions.filter(transaction => transaction.transaction_Id !== transactionId);
          this.reinitializeDataTable(); // Update DataTable after deletion
        },
        error => {
          console.error(`Error deleting transaction with ID ${transactionId}:`, error);
        }
      );
    }
  }
}
