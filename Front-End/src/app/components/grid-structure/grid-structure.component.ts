import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Transaction } from 'src/app/structs';

@Component({
  selector: 'app-grid-structure',
  templateUrl: './grid-structure.component.html',
  styleUrls: ['./grid-structure.component.css']
})
export class GridStructureComponent implements OnInit {
  @Output() eventEmitter = new EventEmitter<Transaction>()

  constructor() { }

  ngOnInit(): void {
  }

  passTransactionToAccount(){
    this.eventEmitter.emit();
  }

}
