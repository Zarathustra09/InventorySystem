import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../Models/transaction.model';
import { TransactionService } from '../../Services/transaction.service';
import {DatePipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    RouterLink
  ],
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe(
      (transactions: Transaction[]) => {
        this.transactions = transactions;
      },
      error => {
        console.error('Error fetching transactions:', error);
      }
    );
  }
}
