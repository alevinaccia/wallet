import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Account } from '../structs';

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

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl + '/accounts')
  }

  addAccount(account: Account) {
    return this.http.post<Account>(this.apiUrl + '/accounts', account, httpOptions)
  }

}
