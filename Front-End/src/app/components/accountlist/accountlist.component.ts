import { Component, ElementRef, OnInit, Query, QueryList, ViewChild } from '@angular/core';
import { Account } from 'src/app/structs';

import { AccountService } from 'src/app/services/account.service';
import { AccountComponent } from '../account/account.component';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-accountlist',
  templateUrl: './accountlist.component.html',
  styleUrls: ['./accountlist.component.css']
})
export class AccountlistComponent implements OnInit {
  @ViewChild(ModalComponent) child?: ModalComponent;

  accounts: Account[] = [];
  balance: Account = {
    'name': 'Overall',
    'value': 0,
    'stats': true,
    'type': '',
    'connection': {
      'name': 'none'
    }
  }
  options = [
    { 'name': 'Binance' }
  ]
  types = [
    {
      'name' : 'Cash'
    },
    {
      'name' : 'Investments'
    },
    {
      'name' : 'Cards'
    }
  ]
  accountName!: string;
  accountValue!: number;
  accountType: string = 'Cash';
  accountStats: boolean = false;
  connection: string = 'none';
  apiKey: string = '';
  apiSecret: string = '';

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.accounts.subscribe(acc => {
      this.accounts = acc;
      this.updateOverall();
    });
    this.accountService.getAccounts();
  }

  toggle() {
    this.child?.toggleModal()
  }

  updateOverall() {
    this.balance.value = 0;
    this.accounts.forEach((acc) => {
      if (acc.stats)
        this.balance.value += acc.value;
        this.balance.value = Number(this.balance.value.toFixed(2));
    })
  }

  onSubmit() {
    //Create the account to add
    let newAccount: Account = {
      'name': this.accountName,
      'stats': this.accountStats,
      'type': this.accountType,
      'value': this.accountValue,
      'connection': {
        'name': this.connection,
        'apiKey': this.apiKey,
        'apiSecret': this.apiSecret,
        'lastUpdate': ''
      }
    }

    this.accountService.addAccount(newAccount);
    this.toggle();
    // if Validate:
  }

  updateForm(value: string) {
    //TODO:Updates according to the selected connection
  }

}
