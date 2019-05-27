import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipeAppComponent} from './recipe-app.component';


const routes: Routes = [
  {
    path: 'recipe',
    children: [
      {path: 'works', component: RecipeAppComponent},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeAppRoutingModule { }
