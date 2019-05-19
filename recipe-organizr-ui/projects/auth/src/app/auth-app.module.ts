import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AuthAppComponent} from './auth-app.component';
import {AuthAppRoutingModule} from './auth-app-routing.module';
import {AuthDetailsComponent} from './auth-details/auth-details.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {OktaAuthModule} from '@okta/okta-angular';
import { SecureLoginComponent } from './secure-login/secure-login.component';
import { ProfileComponent } from './profile/profile.component';

const oktaConfig = {
  issuer: 'https://dev-331898.okta.com/oauth2/default',
  redirectUri: `${window.location.protocol}//${window.location.host}/auth/callback`,
  clientId: '0oam1iayfZDqSKNw1356',
  url: 'https://dev-331898.okta.com',
  responseType: 'id_token',
  scope: 'openid email profile',
  testing: {disableHttpsCheck: true}
};

@NgModule({
  declarations: [
    AuthAppComponent,
    AuthDetailsComponent,
    SecureLoginComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    OktaAuthModule.initAuth(oktaConfig),
    AuthAppRoutingModule,
    TooltipModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AuthAppComponent]
})
export class AuthAppModule {
}
