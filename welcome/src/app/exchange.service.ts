import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

interface CachedRates {
  ts: number;
  data: any;
}

const STORAGE_KEY = 'exchangeRateCache';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private API_KEY = 'c0051022003f26accfb44138';
  private BASE_URL = `https://v6.exchangerate-api.com/v6/${this.API_KEY}/latest`;
  private cache: Record<string, CachedRates> = {};
  private TTL = 1000 * 60 * 60; // 1 hour

  constructor(private http: HttpClient) {
    // Load persisted cache
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        this.cache = JSON.parse(raw);
      } catch {
        this.cache = {};
      }
    }
  }

  getExchangeRates(base: string): Observable<any> {
    const now = Date.now();
    const entry = this.cache[base];

    // If fresh, return cached
    if (entry && now - entry.ts < this.TTL) {
      return of(entry.data);
    }

    // Otherwise fetch from API
    const url = `${this.BASE_URL}/${encodeURIComponent(base)}`;
    return this.http.get<any>(url).pipe(
      tap(data => {
        // Update in‑memory cache
        this.cache[base] = { ts: now, data };
        // Persist all cache to localStorage
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cache));
        } catch {
          // ignore write errors (e.g. quota)
        }
      }),
      // On error, if we have stale data, return it
      catchError(err => {
        if (entry) {
          return of(entry.data);
        }
        return throwError(() => err);
      })
    );
  }
}
