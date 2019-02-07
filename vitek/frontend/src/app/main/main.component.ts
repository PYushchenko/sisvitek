import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TransactionService} from "../transaction.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  constructor(private transactionService: TransactionService, private _userService:UserService) {
  }

  ngOnInit() {
  }

  refreshToken() {
    // this._userService.refreshToken();
  }

  logout() {
    this._userService.logout();
  }

}
