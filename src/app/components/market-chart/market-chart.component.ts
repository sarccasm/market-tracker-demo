import { Component } from '@angular/core';
import { MarketService } from './market.service';

@Component({
  selector: 'app-market-chart',
  templateUrl: './market-chart.component.html'
})
export class MarketChartComponent {
  symbol: string = 'BTCUSD';
  price: number = 0;
  time: string | null = null;

  chartData: { data: number[]; label: string }[] = [{ data: [], label: 'Price' }];
  chartLabels: string[] = [];
  chartOptions = { responsive: true };

  constructor(private marketService: MarketService) {}

  subscribe() {
    if (!this.symbol) return;

    this.marketService.getHistoricalPrices(this.symbol).subscribe(data => {
      this.chartData[0].data = data.prices;
      this.chartLabels = data.timestamps;
    });

    this.marketService.connectToWebSocket(this.symbol).subscribe(msg => {
      this.price = msg.price;
      this.time = msg.time;
      if (this.price !== null) {
        this.chartData[0].data.push(this.price);
        this.chartLabels.push(this.time!);
      }
    });
  }
}