import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Account } from '../structs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private apiUrl = 'http://localhost:3000';
  private accountsSource = new BehaviorSubject<Account[]>([]);
  accounts = this.accountsSource.asObservable();

  constructor(private http: HttpClient) { }

  getAccounts(): void {
    this.http.get<Account[]>(this.apiUrl + '/accounts').subscribe(acc => this.accountsSource.next(acc));
  }

  updateName(_id : Object, newName : string): void{
    this.http.put<Account>(this.apiUrl + '/accounts/name', {newName : newName, _id : _id}).subscribe(acc => {
      let arr = this.accountsSource.getValue();
      arr.map(acc => {
        if(acc._id == _id) acc.name = newName;
      })
      this.accountsSource.next(arr);
    });
  }

  updateValue(_id : Object, newValue : number) : void{
    this.http.put<Account>(this.apiUrl + '/accounts/value', {newValue : newValue, _id : _id}).subscribe( acc => {
      let arr = this.accountsSource.getValue();
      arr.map(acc => {
        if(acc._id == _id) acc.value = newValue;
      })
      this.accountsSource.next(arr);
    })
  }

  addAccount(account: Account) {
    this.http.post<Account>(this.apiUrl + '/accounts', account).subscribe(acc => {
      this.accountsSource.next(this.accountsSource.getValue().concat(acc));
    })
  }

}
