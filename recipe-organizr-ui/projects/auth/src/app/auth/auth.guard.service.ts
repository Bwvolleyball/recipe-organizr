import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {OktaAuthService} from '@okta/okta-angular';
import {CookieService} from 'ngx-cookie-service';

export const ATTEMPTED_URL = 'recipe-organizr-nav-prevented';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private oktaAuth: OktaAuthService, private router: Router, private cookieService: CookieService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (isAuthenticated) {
      return true;
    } else {
      const expiration = new Date();
      // we give them 5 minutes to complete the login process.
      expiration.setMinutes(expiration.getMinutes() + 5);
      this.router.navigateByUrl('/auth/secure').then(_ => this.cookieService.set(ATTEMPTED_URL, encodeURI(state.url), expiration, '/'));
      return false;
    }
  }

}
