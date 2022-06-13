import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Transaction } from 'src/app/structs';
import { ModalComponent } from '../modal/modal.component';
import { TransactionService } from 'src/app/services/transaction.service';
import { AccountService } from 'src/app/services/account.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
  @Input() account!: any; //FIXME this shoudln't be any
  @ViewChild(ModalComponent) modal?: ModalComponent;
  @ViewChild("accountChart") contex!: ElementRef;
  @ViewChild("balanceElement") balanceElement!: ElementRef;

  localTransactions: Transaction[] = [];

  constructor(private transactionService: TransactionService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.transactionService.transactions.subscribe(transactions => {
      this.localTransactions = transactions.filter(t => t.account == this.account.name);
    })
  }

  ngAfterViewInit(): void {
    this.drawChart(this.generateData());
  }

  updateAccountName(newName: string) {
    this.accountService.updateName(this.account._id, newName);
  }

  updateAccountValue(){
    let input = document.createElement('input');
    input.type = "number"
    input.value = this.account.value;
    this.balanceElement.nativeElement.innerHTML = "";
    input.onblur = () => {
      this.balanceElement.nativeElement.innerHTML = `${input.value}€`;
      this.accountService.updateValue(this.account._id, Number(input.value));
      this.drawChart(this.generateData());
    };
		this.balanceElement.nativeElement.appendChild(input);
    input.focus();
  }

  generateData() {
    const xdata: string[] = []
    const ydata: number[] = []
    this.localTransactions.forEach(element => {
      xdata.push(element.date);
      ydata.push(this.account.value + element.value);
    })
    return { xdata, ydata }
  }

  drawChart(data : any) {
      new Chart(this.contex.nativeElement, {
        type: 'line',
        data: {
          labels: data.xdata,
          datasets: [{
            label: '# of Votes',
            data: data.ydata,
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          }]
        },
      });
  }

  toggle() {
    this.modal?.toggleModal();
  }

}
