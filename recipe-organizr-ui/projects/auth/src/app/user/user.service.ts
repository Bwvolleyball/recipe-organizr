import {Injectable, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {OktaAuthService, UserClaims} from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  private oktaUser: Subject<UserClaims> = new Subject<UserClaims>();

  constructor(private oktaAuth: OktaAuthService) {
  }

  ngOnInit() {
    this.oktaAuth.getUser().then(user => this.oktaUser.next(user));
    this.oktaAuth.$authenticationState.subscribe(ignored => {
      this.oktaAuth.getUser().then(user => this.oktaUser.next(user));
    });
  }

  public user(): Subject<UserClaims> {
    this.oktaAuth.getUser().then(user => this.oktaUser.next(user));
    return this.oktaUser;
  }
}
