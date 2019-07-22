import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';


const routes: Routes = [
  {
    path: 'recipe',
    children: [
      {path: 'detail/:random', component: RecipeDetailComponent},
      {path: 'detail/:type/:id', component: RecipeDetailComponent},
      {path: 'list/:search', component: RecipeListComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeAppRoutingModule { }
