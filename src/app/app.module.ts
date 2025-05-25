import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { MarketChartComponent } from './components/market-chart/market-chart.component';
import { MarketService } from './components/market-chart/market.service';

@NgModule({
  declarations: [
    AppComponent,
    MarketChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [MarketService],
  bootstrap: [AppComponent]
})
export class AppModule {}