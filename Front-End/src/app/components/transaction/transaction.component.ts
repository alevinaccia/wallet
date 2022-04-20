import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Transaction } from 'src/app/structs';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  @Input() transaction!:Transaction
  @Output() emitRemoveTransaction : EventEmitter<any> = new EventEmitter(); //FIX type should be string
  

  constructor(private transactionService : TransactionService) { }

  ngOnInit(): void {
    
  }

  deleteTransaction(transaction : any){
    this.transactionService.deleteTransaction(transaction._id).subscribe(id => {
      this.emitRemoveTransaction.emit(id);
    });
  }

}
