import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contestant} from './models/contestant';

@Injectable({
  providedIn: 'root'
})
export class ContestantService {
  constructor(private http: HttpClient) { }

  public register(contestant: Contestant): Observable<any> {
    return this.http.post('/api/register-contestant', contestant)
  }
}
