import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthAppRoutingModule} from '../../projects/auth/src/app/auth-app-routing.module';

const routes: Routes = [
  {path: 'auth', component: AuthAppRoutingModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
