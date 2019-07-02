import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

export const ATTEMPTED_URL = 'recipe-organizr-nav-prevented';

@Injectable({
  providedIn: 'root'
})
export class PreLoginService {

  constructor(private cookieService: CookieService) { }

  public preLoginStateCapture(url: string) {
    const expiration = new Date();
    // we give them 5 minutes to complete the login process.
    expiration.setMinutes(expiration.getMinutes() + 5);
    console.log('Attempting to keep users at %s after they login.', url);
    this.cookieService.set(ATTEMPTED_URL, encodeURI(url), expiration, '/');
  }
}
