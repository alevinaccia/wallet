import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/structs';
import { Chart } from 'chart.js';

interface Data {
  category: string,
  value: number,
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  @ViewChild("expensesPie") expensesPie!: ElementRef;
  @ViewChild("incomePie") incomePie!: ElementRef;


  timeFrame: string = 'Monthly';
  options: any[] = [
    {
      'name': 'Week',
      'value' : 604800
    },
    {
      'name': 'Monthly',
      'value' : 2629743
    },
    {
      'name': 'YTD' //TODO implement YTD
    }
  ]

  constructor(private transactionService: TransactionService) { }
  transactions: Transaction[] = [];

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.transactionService.transactions.subscribe(trans => {
      this.transactions = trans;
      this.update()
    })
  }

  update() {
    let time = this.options.find(o => o.name == this.timeFrame).value;
    let timeFiltered = this.transactions.filter(t => (new Date().valueOf() - new Date(t.date).valueOf()) / 1000 < time);
    this.drawChart(this.incomePie, this.generateData("income", timeFiltered));
    this.drawChart(this.expensesPie, this.generateData("expense", timeFiltered));
  }

  generateData(type: string, transactions : Transaction[]) {
    let filteredTransaction = type == "income" ? transactions.filter(t => t.value > 0) : transactions.filter(t => t.value < 0);
    let data: Data[] = [];
    filteredTransaction.forEach(t => {
      let flag: boolean = false;
      data.forEach(d => {
        if (d.category == t.category) {
          d.value += t.value;
          flag = true;
        }
      })
      if (!flag)
        data.push({ category: t.category, value: t.value })
    })

    let labels = data.map((el) => el.category);
    let values = data.map((el) => el.value);

    return { labels, values };
  }

  drawChart(ctx: ElementRef, data: any) {
    new Chart(ctx.nativeElement, {
      type: 'pie',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'My First Dataset',
          data: data.values,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
        }]
      },
    })
  }

}
