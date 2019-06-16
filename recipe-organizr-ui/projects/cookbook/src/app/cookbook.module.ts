import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CookbookRoutingModule } from './cookbook-routing.module';
import { CookbookComponent } from './cookbook.component';

@NgModule({
  declarations: [
    CookbookComponent
  ],
  imports: [
    BrowserModule,
    CookbookRoutingModule
  ],
  providers: [],
  bootstrap: [CookbookComponent]
})
export class CookbookAppModule { }
