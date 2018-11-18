import { Component, OnInit } from '@angular/core';
import { TradingbooksService } from './tradingbooks.service';
import { Tradingbook } from './tradingbook.model';


@Component({
  selector: 'app-tradingbooks',
  templateUrl: './tradingbooks.component.html',
  styleUrls: ['./tradingbooks.component.css']
})
export class TradingbooksComponent implements OnInit {
    tradingbooks: Tradingbook[] = [];
    constructor(private tradingbookService: TradingbooksService) { }

    ngOnInit() {
      console.log("init of TradingbooksComponent called");
    }

}
