import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/structs';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  @Input() transaction!:Transaction

  constructor(private transactionService : TransactionService) { }

  ngOnInit(): void {
  }

  deleteTransaction(transaction : Transaction){
    this.transactionService.deleteTransaction(transaction._id).subscribe({
      //TODO update transactions list in the transactions element and remove transaction form the ui
    });
  }

}
