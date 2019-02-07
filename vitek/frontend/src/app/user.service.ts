import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  login(user: { password: any; username: any }) {
    return this.httpClient.post<any>("/api-token-auth/", user).pipe(map(user => {
      // login successful if there's a jwt token in the response
      if (user && user.token) {
        this.updateData(user.token);
      }
      return user;
    }));
  }

  private updateData(token: any) {
    localStorage.setItem('access_token', token);
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}
