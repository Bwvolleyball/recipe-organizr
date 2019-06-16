import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CookbookRoutingModule } from './cookbook-routing.module';
import { CookbookComponent } from './cookbook.component';
import { CookbookViewComponent } from './cookbook-view/cookbook-view.component';
import { AddToCookbookBtnComponent } from './add-to-cookbook-btn/add-to-cookbook-btn.component';
import {TooltipModule} from 'ngx-bootstrap';
import {RecipeAppModule} from '../../../recipe/src/app/recipe-app.module';
import { RecipeTileComponent } from './recipe-tile/recipe-tile.component';

@NgModule({
  declarations: [
    CookbookComponent,
    CookbookViewComponent,
    AddToCookbookBtnComponent,
    RecipeTileComponent
  ],
  imports: [
    BrowserModule,
    CookbookRoutingModule,
    TooltipModule
  ],
  providers: [],
  exports: [
    AddToCookbookBtnComponent
  ],
  bootstrap: [CookbookComponent]
})
export class CookbookAppModule { }
