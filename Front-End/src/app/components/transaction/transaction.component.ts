import { Component, OnInit, ViewChild, ElementRef ,Input } from '@angular/core';
import { Category, Transaction } from 'src/app/structs';
import { TransactionService } from 'src/app/services/transaction.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  @Input() transaction!:Transaction;
  @ViewChild("msgElement") msgElement!: ElementRef;
  @ViewChild("catElement") catElement!: ElementRef;
  @ViewChild("valueElement") valueElement!: ElementRef;



  categories : Category[] = [];

  constructor(private transactionService : TransactionService, private categorySerice : CategoryService) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() : void{
    this.categorySerice.categories.subscribe(cat => this.categories = cat );
  }

  updateValue(){
    const OLD = this.transaction.msg;
    let input = document.createElement('input');
    input.type = "number";
    input.value = String(this.transaction.value);
    this.valueElement.nativeElement.innerHTML = "";
    input.onblur = () => {
      this.valueElement.nativeElement.innerHTML = `${input.value}€`;
      if(OLD == input.value) return;
      this.transactionService.updateValue(this.transaction._id || ' ', input.value);
    };
		this.valueElement.nativeElement.appendChild(input);
    input.focus();
  }

  updateCategory(){
    const OLD = this.transaction.category;
    let select = document.createElement('select');
    for(var cat of this.categories){
      let option = document.createElement('option');
      option.innerHTML = cat.name;
      select.appendChild(option);
    }
    select.value = this.transaction.category;
    this.catElement.nativeElement.innerHTML = "";
    select.onblur = () => {
      this.catElement.nativeElement.innerHTML = `${select.value}`;
      if(OLD == select.value) return;
      this.transactionService.updateCategory(this.transaction._id || ' ', select.value);
    };
		this.catElement.nativeElement.appendChild(select);
    select.focus();
  }

  updateMsg(){
    const OLD = this.transaction.msg;
    let input = document.createElement('input');
    input.type = "text";
    input.value = this.transaction.msg;
    this.msgElement.nativeElement.innerHTML = "";
    input.onblur = () => {
      this.msgElement.nativeElement.innerHTML = `${input.value}`;
      if(OLD == input.value) return;
      this.transactionService.updateMsg(this.transaction._id || ' ', input.value);
    };
		this.msgElement.nativeElement.appendChild(input);
    input.focus();
  }

  deleteTransaction(){ 
  	this.transactionService.deleteTransaction(this.transaction._id || ' '); //FIXME Spaghetti 
  }

}
