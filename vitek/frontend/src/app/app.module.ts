import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MAT_DATE_LOCALE, MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule,
  MatIconModule, MatInputModule, MatNativeDateModule, MatSelectModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from "@angular/material";
import {MainComponent} from './main/main.component';
import {HttpClientModule} from "@angular/common/http";
import {TransactionOverviewComponent} from './transaction-overview/transaction-overview.component';
import {PlacesOverviewComponent} from './places-overview/places-overview.component';
import {AddTransactionDialogComponent} from './add-transaction-dialog/add-transaction-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JwtModule} from "@auth0/angular-jwt";
import {LoginComponent} from './login/login.component';
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import { ChartComponent } from './chart/chart.component';
import {ChartModule} from "primeng/chart";
import { ChartCategoryComponent } from './chart-category/chart-category.component';
import { TagListComponent } from './tag-list/tag-list.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TransactionOverviewComponent,
    PlacesOverviewComponent,
    AddTransactionDialogComponent,
    LoginComponent,
    ChartComponent,
    ChartCategoryComponent,
    TagListComponent
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
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatCardModule,
    ChartModule
  ],
  entryComponents: [AddTransactionDialogComponent],
  providers: [{provide: LOCALE_ID, useValue: 'ru-RU'}, {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},],
  bootstrap: [AppComponent]
})
export class AppModule {
}

