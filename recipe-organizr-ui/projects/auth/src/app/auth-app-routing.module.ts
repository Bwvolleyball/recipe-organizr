import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OktaCallbackComponent, OktaAuthGuard} from '@okta/okta-angular';
import {SecureLoginComponent} from './secure-login/secure-login.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from './auth.guard.service';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {path: 'secure', component: SecureLoginComponent},
      {path: 'callback', component: OktaCallbackComponent},
      {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthAppRoutingModule {
}