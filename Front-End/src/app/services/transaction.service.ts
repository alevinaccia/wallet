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

  updateMsg(_id : string, newMsg : string): void{
    this.http.put<Transaction>(this.apiUrl + '/transactions/msg', {newMsg : newMsg, _id : _id}).subscribe(tra => {
      let arr = this.transactionsSource.getValue();
      arr.map(tra => {
        if(tra._id == _id) tra.msg = newMsg;
      })
      this.transactionsSource.next(arr);
    });
  }

  updateCategory(_id : string, newCat : string){
    this.http.put<Transaction>(this.apiUrl + '/transactions/category', {newCat : newCat, _id : _id}).subscribe(tra => {
      let arr = this.transactionsSource.getValue();
      arr.map(tra => {
        if(tra._id == _id) tra.category = newCat;
      })
      this.transactionsSource.next(arr);
    });
  }

  updateValue(_id : string, newValue : string){
    this.http.put<Transaction>(this.apiUrl + '/transactions/value', {newValue : newValue, _id : _id}).subscribe(tra => {
      let arr = this.transactionsSource.getValue();
      arr.map(tra => {
        if(tra._id == _id) tra.value = Number(newValue);
      })
      this.transactionsSource.next(arr);
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
