import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

interface CachedWeather {
  ts: number;
  data: any;
}

const STORAGE_KEY = 'weatherCache';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '4afabd17f64c42929d3121657251405';
  private baseUrl = 'https://api.weatherapi.com/v1';
  private cache: Record<string, CachedWeather> = {};
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

  getCurrentWeather(city: string): Observable<any> {
    const now = Date.now();
    const entry = this.cache[city];

    // Return fresh cached data if within TTL
    if (entry && now - entry.ts < this.TTL) {
      return of(entry.data);
    }

    // Fetch from API
    const url = `${this.baseUrl}/current.json?key=${this.apiKey}&q=${encodeURIComponent(city)}`;
    return this.http.get<any>(url).pipe(
      tap(data => {
        // Update in-memory & persisted cache
        this.cache[city] = { ts: now, data };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cache));
        } catch {
          // ignore quota errors
        }
      }),
      catchError(err => {
        if (entry) {
          // On error, if we have stale data, return it
          return of(entry.data);
        }
        // No stale data: rethrow
        return throwError(() => err);
      })
    );
  }
}
