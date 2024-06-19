import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Transaction} from "../Models/transaction.model";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'https://localhost:7119/api/Transactions'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getTransactionById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction, { headers: this.getHeaders() });
  }

  updateTransaction(id: number, transaction: Transaction): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, transaction, { headers: this.getHeaders() });
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
