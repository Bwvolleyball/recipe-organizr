import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {OktaAuthService, OktaCallbackComponent} from '@okta/okta-angular';
import {LoginService} from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class PostAuthenticationGuard implements CanDeactivate<OktaCallbackComponent> {

  constructor(private oktaAuth: OktaAuthService, private loginService: LoginService) {
  }

  canDeactivate(_: OktaCallbackComponent, __: ActivatedRouteSnapshot, ___: RouterStateSnapshot, ____: RouterStateSnapshot): boolean {
    this.oktaAuth.isAuthenticated().then(authenticated => {
      this.oktaAuth.getIdToken().then(idToken => {
        this.oktaAuth.getAccessToken().then(accessToken => {
          this.loginService.login(idToken, accessToken, authenticated);
        });
      });
    });
    // we always allow the user to deactivate the OktaCallbackComponent, but we leverage this to capture their login.
    return true;
  }
}
