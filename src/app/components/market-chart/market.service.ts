import { Injectable } from '@angular/core';
import { Observable, of, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MarketService {
  getHistoricalPrices(symbol: string): Observable<any> {
    return of({
      prices: [100, 102, 105, 110],
      timestamps: ['10:00', '10:01', '10:02', '10:03']
    });
  }

  connectToWebSocket(symbol: string): Observable<any> {
    return interval(2000).pipe(
      map(i => ({
        price: 110 + Math.random() * 10,
        time: new Date().toLocaleTimeString()
      }))
    );
  }
}