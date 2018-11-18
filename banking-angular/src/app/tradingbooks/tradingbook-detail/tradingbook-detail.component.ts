import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TradingbooksService } from '../tradingbooks.service';
import { Portfolio } from '../portfolio.model';
import { Transaction } from '../transaction.model';


@Component({
  selector: 'app-tradingbook-detail',
  templateUrl: './tradingbook-detail.component.html',
  styleUrls: ['./tradingbook-detail.component.css']
})
export class TradingbookDetailComponent implements OnInit {
  portfolios : Portfolio[];
  transactions : Transaction[];
  id: number;

  constructor(private tradingbookService: TradingbooksService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.portfolios = this.tradingbookService.getPortfolios(this.id);
          this.transactions = this.tradingbookService.getTransactions(this.id);

        }
      )

  }

}
