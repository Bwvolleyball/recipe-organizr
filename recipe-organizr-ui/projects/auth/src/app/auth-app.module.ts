import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AuthAppComponent} from './auth-app.component';
import {AuthAppRoutingModule} from './auth-app-routing.module';

@NgModule({
  declarations: [
    AuthAppComponent
  ],
  imports: [
    BrowserModule,
    AuthAppRoutingModule
  ],
  providers: [],
  bootstrap: [AuthAppComponent]
})
export class AuthAppModule {
}
