import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from "./user.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    public jwtHelper: JwtHelperService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('Guard');
    console.log(this.jwtHelper.tokenGetter());
    console.log(this.jwtHelper.isTokenExpired());
    if (!this.jwtHelper.isTokenExpired()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
