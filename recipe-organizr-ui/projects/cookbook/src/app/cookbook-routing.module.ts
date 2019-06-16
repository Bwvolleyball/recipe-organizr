import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../../auth/src/app/auth/auth.guard.service';
import {CookbookComponent} from './cookbook.component';

const routes: Routes = [
  {
    path: 'cookbook',
    children: [
      {path: 'view', component: CookbookComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CookbookRoutingModule { }
