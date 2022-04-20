import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../structs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  addTransaction(transaction : Transaction) : Observable<Transaction>{
    return this.http.post<Transaction>(this.apiUrl + '/transactions', transaction);
  }

  getTransactions() : Observable<Transaction[]>{
    return this.http.get<Transaction[]>(this.apiUrl + '/transactions');
  }

  deleteTransaction(id : string) { //This shouldn't be 'any'
    return this.http.delete(this.apiUrl + '/transactions', {
      headers : {
        '_id' : id
      }
    });
  }

}
