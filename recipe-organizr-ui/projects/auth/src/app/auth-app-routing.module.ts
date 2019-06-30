import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OktaCallbackComponent} from '@okta/okta-angular';
import {SecureLoginComponent} from './secure-login/secure-login.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from './auth/auth.guard.service';
import {PostAuthenticationGuard} from './post-authentication/post-authentication.guard';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {path: 'secure', component: SecureLoginComponent},
      {path: 'callback', component: OktaCallbackComponent, canDeactivate: [PostAuthenticationGuard]},
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
