import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {RecipeAppRoutingModule} from './recipe-app-routing.module';
import {RecipeAppComponent} from './recipe-app.component';


@NgModule({
  declarations: [
    RecipeAppComponent
  ],
  imports: [
    BrowserModule,
    RecipeAppRoutingModule
  ],
  providers: [],
  bootstrap: [RecipeAppComponent]
})
export class RecipeAppModule { }
