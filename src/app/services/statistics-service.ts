import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Statistics} from './models/statistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private http: HttpClient) { }

  public getStatistics(): Observable<Statistics> {
    return this.http.get<Statistics>('/api/statistics')
  }
}
