import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'src/app/structs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  @Input() account!:Account;

  constructor() { }

  ngOnInit(): void {
  }

}
