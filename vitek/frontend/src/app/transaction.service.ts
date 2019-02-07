import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) {
  }

  list() {
    return this.http.get('/api/transactions');
  }

  createOutcome(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post('api/outcome_transactions', JSON.stringify(data), httpOptions);
  }
}
