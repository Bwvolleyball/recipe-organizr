import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {RecipeAppRoutingModule} from './recipe-app-routing.module';
import {RecipeAppComponent} from './recipe-app.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import {TooltipModule} from 'ngx-bootstrap';


@NgModule({
  declarations: [
    RecipeAppComponent,
    RecipeDetailComponent
  ],
  imports: [
    BrowserModule,
    RecipeAppRoutingModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [RecipeAppComponent]
})
export class RecipeAppModule { }
