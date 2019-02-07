import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatButtonModule, MatChipsModule,
  MatDialogModule,
  MatIconModule, MatInputModule, MatSelectModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from "@angular/material";
import { MainComponent } from './main/main.component';
import {HttpClientModule} from "@angular/common/http";
import { TransactionOverviewComponent } from './transaction-overview/transaction-overview.component';
import { PlacesOverviewComponent } from './places-overview/places-overview.component';
import { AddTransactionDialogComponent } from './add-transaction-dialog/add-transaction-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JwtModule} from "@auth0/angular-jwt";
import { LoginComponent } from './login/login.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TransactionOverviewComponent,
    PlacesOverviewComponent,
    AddTransactionDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
        JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [],
        blacklistedRoutes: [],
        authScheme: "JWT "
      }
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule
  ],
  entryComponents: [ AddTransactionDialogComponent ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }

