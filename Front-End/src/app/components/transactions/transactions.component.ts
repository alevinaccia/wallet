import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { TransactionService } from 'src/app/services/transaction.service';
import { Account, Transaction, Category } from 'src/app/structs';
import { AccountService } from 'src/app/services/account.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  @ViewChild('myname') modal?: ModalComponent;
  @ViewChild('transactionType') type!: HTMLElement;
  @ViewChild('addBTN') addBTN!: ElementRef;

  transactions: Transaction[] = [];
  accounts: Account[] = [];
  categories: Category[] = [];
  value!: number;
  transactionType: string = 'Income';
  account: string = 'none';
  message !: string;
  date: string = new Date().toISOString().slice(0, 10);
  category: string = 'none';

  constructor(private transactionService: TransactionService, private accountService: AccountService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() : void {
    this.transactionService.transactions.subscribe(t => {
      this.transactions = t;
      this.accountService.getAccounts();
      this.moveAddBTN();
    })
    this.transactionService.getTransactions();
    this.accountService.accounts.subscribe(acc => this.accounts = acc);
    this.categoryService.categories.subscribe(cat => this.categories = cat);
    this.categoryService.getCategories();
  }

  updateSelection(event: Event) { //TODO refactor this spaghetti code
    const element = event.target as HTMLElement;
    let length = element.parentElement!.children.length;
    for (let i = 0; i < length; i++) {
      if (element.parentElement?.children[i].classList.contains('selected')) {
        element.parentElement.children[i].classList.remove('selected');
      }
    }
    element.classList.add('selected')
    this.transactionType = element.innerText;
  }

  addTransaction() {
    //TODO: check if the transaction was added succesfully
    let newTransaction: Transaction = {
      'msg': this.message,
      'value': this.transactionType == "Income" ? this.value : -this.value,
      'account': this.account,
      'type': this.transactionType,
      'date': this.date,
      category : this.category
    }

    this.transactionService.addTransaction(newTransaction)

    this.toggleTransactionModal();
  }

  moveAddBTN() {
    if(this.transactions.length == 0){
      this.addBTN.nativeElement.classList = ['transaction-button-center'];
    }else{
      this.addBTN.nativeElement.classList = ['transaction-button-bottom'];
    }
    
  }

  toggleTransactionModal() {
    this.modal?.toggleModal()
  }
}
