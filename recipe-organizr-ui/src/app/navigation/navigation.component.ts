import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../projects/auth/src/app/user.service';
import {OktaAuthService, UserClaims} from '@okta/okta-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  private userClaims: UserClaims;
  private user = 'Guest';

  isAuthenticated: boolean;

  constructor(private userService: UserService, private oktaAuth: OktaAuthService, private router: Router) {
    this.oktaAuth.$authenticationState.subscribe((isAuthenticated: boolean) => this.authenticatedStateChanged(isAuthenticated));
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.authenticatedStateChanged(this.isAuthenticated);
  }

  login() {
    this.oktaAuth.loginRedirect('/profile');
  }

  logout() {
    this.oktaAuth.logout().then(() => this.router.navigateByUrl('/'));
  }

  authenticatedStateChanged(isAuthenticated: boolean) {
    console.log('New authenticated state: %s', isAuthenticated);
    this.isAuthenticated = isAuthenticated;
    if (isAuthenticated) {
      this.oktaAuth.getUser().then(user => {
        this.userClaims = user;
        this.user = this.userClaims.given_name;
      });
    } else {
      this.userClaims = null;
      this.user = 'Guest';
    }

  }

}
