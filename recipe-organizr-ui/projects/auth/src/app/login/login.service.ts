import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login} from './login';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../user/user';
import {OktaAuthService, UserClaims} from '@okta/okta-angular';
import {Observable} from 'rxjs';

const RECIPE_ORGANIZR_COOKIE = 'recipe-organizr-just-desserts';

@Injectable({
  providedIn: 'root'
})
export class LoginService {



  constructor(private http: HttpClient, private cookieService: CookieService, private oktaAuth: OktaAuthService) { }

  public login(idToken: string, accessToken: string, authenticated: boolean) {
    const login: Login = {idToken, accessToken, authenticated};
    this.http.post<User>('/api/auth/login', login).subscribe(user => this.setLoginCookie(user),
        error => console.error('Got an error! %o', error));
  }

  public loginAttempt() {
    this.oktaAuth.loginRedirect('/profile');
  }

  public authenticationState(): Observable<boolean> {
    return this.oktaAuth.$authenticationState;
  }

  public authenticated(): Promise<boolean> {
    return this.oktaAuth.isAuthenticated();
  }

  private setLoginCookie(user: User) {
    console.log('Got user: %o', user);
    // this cookie lasts for 4 hours.
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 4);
    this.cookieService.set(RECIPE_ORGANIZR_COOKIE, User.toCookieString(user), expiration, '/' );
  }

  public logout(): Promise<void> {
    this.cookieService.delete(RECIPE_ORGANIZR_COOKIE);
    return  this.oktaAuth.logout();
  }

  public oktaUser(): Promise<UserClaims> {
    return this.oktaAuth.getUser();
  }

  public user(): User {
    if (this.cookieService.check(RECIPE_ORGANIZR_COOKIE)) {
      const cookieString = this.cookieService.get(RECIPE_ORGANIZR_COOKIE);
      return User.fromCookieString(cookieString);
    } else {
      throw new Error('We tried to find the user, but we didn\'t, they must not be logged in.');
    }
  }
}
