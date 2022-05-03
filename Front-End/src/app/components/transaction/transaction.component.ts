import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/structs';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  @Input() transaction!:Transaction;

  constructor(private transactionService : TransactionService) { }

  ngOnInit(): void {
    
  }

  updateTransaction(transaction : Transaction){
    
  }

  deleteTransaction(transaction : any){ //FIXME type should be transaction, not any
  	this.transactionService.deleteTransaction(transaction._id);
  }

}
