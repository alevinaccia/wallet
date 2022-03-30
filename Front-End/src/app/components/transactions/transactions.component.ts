import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { TransactionService } from 'src/app/services/transaction.service';
import { Account, Transaction } from 'src/app/structs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  @ViewChild('myname') modal?:ModalComponent;
  @ViewChild('transactionType') type!:HTMLElement;
  @ViewChild('addBTN') addBTN!:ElementRef;
  
  transactions: Transaction[] = [];
  accounts: Account[] = [];
  value?:number;
  transactionType?:string = 'Income';
  account: string = 'none';
  message ?: string;

  constructor(private transactionService:TransactionService, private accountService:AccountService) { }

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((transactions) => this.transactions = transactions);
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
  }

  ngAfterViewInit(){
    if(this.transactions != []){
      this.moveAddBTN();
    }
  }

  updateSelection(event:Event){ //TODO refator this spaghetti code
    const element = event.target as HTMLElement;
    let length = element.parentElement!.children.length;
    for (let i = 0; i < length; i++){
      if(element.parentElement?.children[i].classList.contains('selected')){
        element.parentElement.children[i].classList.remove('selected');
      }
    }
    element.classList.add('selected')
    this.transactionType = element.innerText;
  }

  addTransaction(){
    console.log(this.account);
    
    let newTransaction : Transaction = {
      'msg' : this.message , 
      'value' : this.value,
      'account' : this.account,
      'type' : this.transactionType
    }

    this.transactionService.addTransaction(newTransaction).subscribe((transaction) => this.transactions.push(transaction));
    console.log(this.transactions);
    
    this.toggleTransactionModal();
  }

  moveAddBTN(){
    this.addBTN.nativeElement.classList.toggle("transaction-button-center");
    this.addBTN.nativeElement.classList.toggle("transaction-button-bottom");
  }

  toggleTransactionModal(){
    this.modal?.toggleModal()
  }
}
