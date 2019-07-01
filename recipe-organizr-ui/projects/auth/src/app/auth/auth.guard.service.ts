import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {OktaAuthService} from '@okta/okta-angular';
import {CookieService} from 'ngx-cookie-service';
import {PreLoginService} from '../pre-login/pre-login.service';

export const ATTEMPTED_URL = 'recipe-organizr-nav-prevented';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private oktaAuth: OktaAuthService, private router: Router, private preLoginService: PreLoginService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigateByUrl('/auth/secure').then(_ => this.preLoginService.preLoginStateCapture(state.url));
      return false;
    }
  }

}
