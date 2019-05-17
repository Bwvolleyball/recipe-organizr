import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthAppComponent} from './auth-app.component';

const routes: Routes = [
  {path: 'auth', component: AuthAppComponent,
  children: [
    {path: '**', component: AuthAppComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthAppRoutingModule { }
