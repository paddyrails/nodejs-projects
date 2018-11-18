import { Injectable } from '@angular/core';
import { Tradingbook } from './tradingbook.model';
import { Portfolio } from './portfolio.model';
import { Transaction } from './transaction.model';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TradingbooksService {

  private tradingbooks: Tradingbook[] = [];
  private portfolios: Portfolio[] = [];
  private transactions: Transaction[] = [];

  constructor(private http: Http,
              private httpClient: HttpClient) { }

  // getTradingbooks(){
  //   return this.http.get('http://localhost:8090/books')
  //     .map((response: any) => response.json()).toPromise()
  // }

  getTradingbooks(){
    const tradingbooks = this.httpClient.get<Tradingbook[]>('http://localhost:8090/books').toPromise();
    return tradingbooks;
  }

  initializePortfolios(bookid: number){
    this.http.get('http://localhost:8090/portfolios/' + bookid)
      .map((response: any) => response.json())
      .subscribe(
        (portfolios: any) => {
          this.portfolios = portfolios;
        }
      )
  }

  getPortfolios(id: number){
    this.initializePortfolios(id);
    return this.portfolios.slice();
  }

  initializeTransactions(bookid: number){
    this.http.get('http://localhost:8090/transactions/' + bookid)
      .map((response: any) => response.json())
      .subscribe(
        (transactions: any) => {
          this.transactions = transactions;
        }
      )
  }

  getTransactions(id: number){
    this.initializeTransactions(id);
    return this.transactions.slice();
  }

}
