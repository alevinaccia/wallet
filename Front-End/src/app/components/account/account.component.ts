import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Account, Transaction } from 'src/app/structs';
import { ModalComponent } from '../modal/modal.component';
import { TransactionService } from 'src/app/services/transaction.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
  @Input() account!: Account;
  @ViewChild(ModalComponent) modal?: ModalComponent;
  @ViewChild("accountChart") contex!: ElementRef;

  localTransactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    /*this.transactionService.transactions.subscribe(transactions => {
      this.localTransactions = transactions.filter(t => t.account == this.account.name);
    })*/
    this.localTransactions = this.transactionService.getTransactionstemp();
  }

  ngAfterViewInit(): void {
    this.drawChart(this.generateData());
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

  drawChart(data: any) {
    const myChart = new Chart(this.contex.nativeElement, {
      type: 'line',
      data: {
          labels: data.xdata,
          datasets: [{
              label: '# of Votes',
              data: data.ydata,
              backgroundColor: 'rgba(255, 99, 132, 0.7)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
          }]
      },
  });
  }

  toggle() {
    this.modal?.toggleModal();
  }

}
