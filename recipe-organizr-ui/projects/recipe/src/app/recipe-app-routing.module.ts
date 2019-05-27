import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipeAppComponent} from './recipe-app.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';


const routes: Routes = [
  {
    path: 'recipe',
    children: [
      {path: 'works', component: RecipeAppComponent},
      {path: 'detail/:id', component: RecipeDetailComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeAppRoutingModule { }
