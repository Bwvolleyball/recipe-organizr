import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OktaCallbackComponent} from '@okta/okta-angular';
import {SecureLoginComponent} from './secure-login/secure-login.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {path: 'secure', component: SecureLoginComponent},
      {path: 'callback', component: OktaCallbackComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthAppRoutingModule {
}
