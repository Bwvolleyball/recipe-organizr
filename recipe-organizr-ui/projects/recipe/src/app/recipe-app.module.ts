import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {RecipeAppRoutingModule} from './recipe-app-routing.module';
import {RecipeAppComponent} from './recipe-app.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import {TooltipModule} from 'ngx-bootstrap';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeTileComponent } from './recipe-tile/recipe-tile.component';
import {CookbookAppModule} from '../../../cookbook/src/app/cookbook.module';


@NgModule({
  declarations: [
    RecipeAppComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeTileComponent
  ],
  imports: [
    BrowserModule,
    RecipeAppRoutingModule,
    TooltipModule,
    CookbookAppModule
  ],
  providers: [],
  bootstrap: [RecipeAppComponent]
})
export class RecipeAppModule { }
