import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../../auth/src/app/auth/auth.guard.service';
import {CookbookViewComponent} from './cookbook-view/cookbook-view.component';

const routes: Routes = [
  {
    path: 'cookbook',
    children: [
      {path: 'view', component: CookbookViewComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CookbookRoutingModule { }
