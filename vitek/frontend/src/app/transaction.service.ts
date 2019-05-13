import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Transaction} from "./models/transaction";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) {
  }

  list(tags?: number[]) {
    let params = new HttpParams();
    tags.forEach(tag => params = params.append("tags", tag.toString()));
    return this.http.get<Transaction[]>('/api/transactions', {params: params});
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
