import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {AuthGuard} from "./auth.guard";
import {LoginComponent} from "./login/login.component";
import {ChartComponent} from "./chart/chart.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'chart',
    component: ChartComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
