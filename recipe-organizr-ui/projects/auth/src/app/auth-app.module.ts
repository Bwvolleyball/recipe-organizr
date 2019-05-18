import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AuthAppComponent} from './auth-app.component';
import {AuthAppRoutingModule} from './auth-app-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthDetailsComponent } from './auth-details/auth-details.component';
import {AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule} from 'angularx-social-login';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('440911780499-tpou22tgqifrbg4rija4i90njjp8sd8c.apps.googleusercontent.com', {})
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('456628388473484')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AuthAppComponent,
    LoginComponent,
    AuthDetailsComponent
  ],
  imports: [
    BrowserModule,
    AuthAppRoutingModule,
    SocialLoginModule,
    TooltipModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AuthAppComponent]
})
export class AuthAppModule {
}
