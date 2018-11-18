import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { TradingbooksService } from './tradingbooks/tradingbooks.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './core/home/home.component';
import { TradingbooksComponent } from './tradingbooks/tradingbooks.component';
import { TradingbookListComponent } from './tradingbooks/tradingbook-list/tradingbook-list.component';
import { TradingbookItemComponent } from './tradingbooks/tradingbook-list/tradingbook-item/tradingbook-item.component';
import { TradingbookDetailComponent } from './tradingbooks/tradingbook-detail/tradingbook-detail.component';
import { TradingbookDetailItemComponent } from './tradingbooks/tradingbook-detail/tradingbook-detail-item/tradingbook-detail-item.component';
import { FilterPipe} from './tradingbooks/shared/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TradingbooksComponent,
    TradingbookListComponent,
    TradingbookItemComponent,
    TradingbookDetailComponent,
    TradingbookDetailItemComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [TradingbooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
