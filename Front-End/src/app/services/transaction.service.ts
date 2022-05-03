import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../structs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = "http://localhost:3000";
  private transactionsSource = new BehaviorSubject<Transaction[]>([]);
  transactions = this.transactionsSource.asObservable();

  constructor(private http: HttpClient) { }

  addTransaction(transaction : Transaction){
    this.http.post<Transaction>(this.apiUrl + '/transactions', transaction).subscribe(t => {
      this.transactionsSource.next(this.transactionsSource.getValue().concat(t));
    });
  }

  getTransactions(){
    this.http.get<Transaction[]>(this.apiUrl + '/transactions').subscribe(t => {
      this.transactionsSource.next(t);
    });
  }

  deleteTransaction(id : string) { 
    this.http.delete(this.apiUrl + '/transactions', {
      headers : {
        '_id' : id
      }
    }).subscribe(removedId => {
      let arr = this.transactionsSource.getValue();
      arr.forEach((item, index) => {
        if(item._id == removedId){
          arr.splice(index,1);
        }
      }) 
      this.transactionsSource.next(arr);
    })
  }

}
