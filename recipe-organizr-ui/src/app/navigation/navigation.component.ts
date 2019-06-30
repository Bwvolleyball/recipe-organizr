import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../projects/auth/src/app/user/user.service';
import {UserClaims} from '@okta/okta-angular';
import {Router} from '@angular/router';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {LoginService} from '../../../projects/auth/src/app/login/login.service';
import {PreLoginService} from '../../../projects/auth/src/app/pre-login/pre-login.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  userClaims: UserClaims;
  user = 'Guest';

  faHome = faHome;

  isAuthenticated: boolean;

  constructor(private userService: UserService, private preLoginService: PreLoginService, private loginService: LoginService, private router: Router) {
    this.loginService.authenticationState().subscribe((isAuthenticated: boolean) => this.authenticatedStateChanged(isAuthenticated));
  }

  async ngOnInit() {
    this.isAuthenticated = await this.loginService.authenticated();
    this.authenticatedStateChanged(this.isAuthenticated);
  }

  login() {
    this.preLoginService.preLoginStateCapture(this.router.url);
  }

  logout() {
    this.loginService.logout().then(() => this.router.navigateByUrl('/'));
  }

  authenticatedStateChanged(isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated;
    if (isAuthenticated) {
      this.loginService.oktaUser().then(user => {
        this.userClaims = user;
        this.user = this.userClaims.given_name;
      });
    } else {
      this.userClaims = null;
      this.user = 'Guest';
    }

  }

}
