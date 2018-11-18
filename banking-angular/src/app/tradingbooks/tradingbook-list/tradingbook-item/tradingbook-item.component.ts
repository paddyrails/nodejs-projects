import { Component, OnInit, Input } from '@angular/core';
import { Tradingbook } from '../../tradingbook.model';

@Component({
  selector: 'app-tradingbook-item',
  templateUrl: './tradingbook-item.component.html',
  styleUrls: ['./tradingbook-item.component.css']
})
export class TradingbookItemComponent implements OnInit {
  @Input() tradingbook: Tradingbook;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

}
