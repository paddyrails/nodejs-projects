import { Component, OnInit, Input } from '@angular/core';
import { TradingbooksService } from '../tradingbooks.service';
import { Tradingbook } from '../tradingbook.model';


@Component({
  selector: 'app-tradingbook-list',
  templateUrl: './tradingbook-list.component.html',
  styleUrls: ['./tradingbook-list.component.css']
})
export class TradingbookListComponent implements OnInit {
  tradingbooks: Tradingbook[];
  constructor(private tradingbookService: TradingbooksService) { }

  async ngOnInit() {
    console.log("init of Tradingbooks List called");
    this.tradingbooks = await this.tradingbookService.getTradingbooks();    
    console.log(this.tradingbooks);
  }

}
