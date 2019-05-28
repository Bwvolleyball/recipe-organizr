import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';


const routes: Routes = [
  {
    path: 'recipe',
    children: [
      {path: 'detail/:id', component: RecipeDetailComponent},
      {path: 'list/:search', component: RecipeListComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeAppRoutingModule { }
