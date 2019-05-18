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

  }
}
