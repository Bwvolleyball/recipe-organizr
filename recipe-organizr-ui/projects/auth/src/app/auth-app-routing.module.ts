import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthAppComponent} from './auth-app.component';
import {LoginComponent} from './login/login.component';
import {AuthDetailsComponent} from './auth-details/auth-details.component';

const routes: Routes = [
  {path: 'auth',
  children: [
    {path: 'login', component: LoginComponent},
    {path: '**', component: AuthDetailsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthAppRoutingModule { }
