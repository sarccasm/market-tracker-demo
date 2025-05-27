import { Component, OnInit } from '@angular/core';
import { MarketService } from './market.service';

@Component({
  selector: 'app-market-chart',
  templateUrl: './market-chart.component.html'
})
export class MarketChartComponent implements OnInit {
  symbol: string = 'BTCUSDT';
  price: number | null = null;
  time: string | null = null;

  chartData = [{ data: [] as number[], label: 'Price' }];
  chartLabels: string[] = [];
  chartOptions = { responsive: true };

  constructor(private marketService: MarketService) {}

  ngOnInit(): void {}

  subscribe() {
    if (!this.symbol) return;

    this.marketService.getHistoricalPrices(this.symbol).subscribe(data => {
      if (data.s === 'ok') {
        this.chartData[0].data = data.c;
        this.chartLabels = data.t.map((ts: number) =>
          new Date(ts * 1000).toLocaleTimeString()
        );
      }
    });

    this.marketService.connectToWebSocket(this.symbol).subscribe((msg: { price: number; time: string }) => {
      this.price = msg.price;
      this.time = msg.time;

      if (this.price !== null && this.time) {
        this.chartData[0].data.push(this.price);
        this.chartLabels.push(this.time);
      }
    });
  }
}
