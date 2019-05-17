import { BrowserModule } from '@angular/platform-browser';
import {ModuleWithProviders, NgModule} from '@angular/core';

import { AuthAppComponent } from './auth-app.component';

const providers = [];

@NgModule({
  declarations: [
    AuthAppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers,
  bootstrap: [AuthAppComponent]
})
export class AuthAppModule { }

@NgModule({})
export class AuthAppSharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthAppModule,
      providers
    };
  }
}
