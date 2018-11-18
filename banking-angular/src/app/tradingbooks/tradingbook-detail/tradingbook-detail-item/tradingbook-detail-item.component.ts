import { Component, OnInit, Input } from '@angular/core';
import { Portfolio } from '../../portfolio.model';
@Component({
  selector: 'app-tradingbook-detail-item',
  templateUrl: './tradingbook-detail-item.component.html',
  styleUrls: ['./tradingbook-detail-item.component.css']
})
export class TradingbookDetailItemComponent implements OnInit {
  @Input() portfolio: Portfolio;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

}
