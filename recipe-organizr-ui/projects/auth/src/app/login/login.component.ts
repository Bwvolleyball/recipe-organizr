import { Component, OnInit } from '@angular/core';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {UserService} from '../user.service';
import {faQuestionCircle} from '@fortawesome/free-regular-svg-icons/faQuestionCircle';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private gState = 'normal';
  faQuestionCircle = faQuestionCircle;

  constructor(private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => { if (user) { this.userService.setUser(user); } } );
  }

  signInWithGoogle(): void {
    this.userService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFacebook(): void {
    this.userService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  focusGoogle(): void {
    this.gState = 'focus';
  }

  defocusGoogle(): void {
    this.gState = 'normal';
  }

  clickFacebook(): void {
    this.signInWithFacebook();
  }

  clickGoogle(): void {
    this.gState = 'pressed';
    this.signInWithGoogle();
  }

  disableGoogle(): void {
    this.gState = 'disabled';
  }

}
