import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  private readonly API_KEY = 'd0qrei9r01qn4tjepta0d0qrei9r01qn4tjeptag';
  private readonly REST_URL = 'https://finnhub.io/api/v1/crypto/candle';

  constructor(private http: HttpClient) {}

  getHistoricalPrices(symbol: string): Observable<any> {
    const url = `${this.REST_URL}?symbol=BINANCE:${symbol}&resolution=1&count=30&token=${this.API_KEY}`;
    return this.http.get<any>(url);
  }

  connectToWebSocket(symbol: string): Observable<{ price: number; time: string }> {
    return new Observable(observer => {
      const ws = new WebSocket(`wss://ws.finnhub.io?token=${this.API_KEY}`);

      ws.onopen = () => {
        ws.send(JSON.stringify({ type: 'subscribe', symbol: `BINANCE:${symbol}` }));
      };

      ws.onmessage = event => {
        const data = JSON.parse(event.data);
        const msg = data.data?.[0];
        if (msg?.p && msg?.t) {
          observer.next({
            price: msg.p,
            time: new Date(msg.t).toLocaleTimeString(),
          });
        }
      };

      ws.onerror = err => observer.error(err);
      ws.onclose = () => observer.complete();
    });
  }
}
