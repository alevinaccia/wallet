import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AccountlistComponent } from './components/accountlist/accountlist.component';
import { AccountComponent } from './components/account/account.component';
import { GridStructureComponent } from './components/grid-structure/grid-structure.component';
import { StatsComponent } from './components/stats/stats.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { ModalComponent } from './components/modal/modal.component';
import { TransactionComponent } from './components/transaction/transaction.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccountlistComponent,
    AccountComponent,
    GridStructureComponent,
    StatsComponent,
    TransactionsComponent,
    ModalComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
