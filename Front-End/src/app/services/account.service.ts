import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Account } from '../structs';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

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

  addAccount(account: Account) {
    return this.http.post<Account>(this.apiUrl + '/accounts', account, httpOptions)
  }

}
