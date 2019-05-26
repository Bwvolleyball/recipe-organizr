import { Component, OnInit } from '@angular/core';
import * as OktaSignIn from '@okta/okta-signin-widget';
import {OktaAuthService} from '@okta/okta-angular';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'auth-secure-login',
  templateUrl: './secure-login.component.html',
  styleUrls: ['./secure-login.component.scss']
})
export class SecureLoginComponent implements OnInit {

  signIn;
  widget = new OktaSignIn({
    logo: '//logo.clearbit.com/regis.edu',
    baseUrl: 'https://dev-331898.okta.com',
    clientId: '0oam1iayfZDqSKNw1356',
    redirectUri: `${window.location.protocol}//${window.location.host}/auth/callback`,
    i18n: {
      en: {
        'primaryauth.title': 'Sign in to Recipe Organizr'
      }
    },
    idps: [
      {type: 'GOOGLE', id: '0oam1ib2we8xCqMot356'},
      {type: 'FACEBOOK', id: '0oam2fl55LX8PYKhR356'}
    ],
    idpDisplay: 'PRIMARY',
    authParams: {
      display: 'page',
      responseType: ['id_token', 'token'],
      scopes: ['openid', 'email', 'profile', 'address', 'phone']
    },
    customButtons: [
      {
        title: 'Register with Social Providers',
        className: 'btn-okta-help',
        // tslint:disable-next-line:only-arrow-functions object-literal-shorthand
        click: function() {
          document.getElementById('login-info').scrollIntoView();
        }
      }
    ],
    features: {
      registration: true
    }
  });
  constructor(oktaAuth: OktaAuthService, private router: Router) {
    this.signIn = oktaAuth;

    oktaAuth.isAuthenticated().then(isAuthenticated => {
      if (isAuthenticated) {
        router.navigateByUrl('/auth/profile');
      }
    });
    // show widget when prompted, otherwise remove it from the DOM
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        if (event.url === '/auth/secure') {
        } else {
          this.widget.remove();
        }
      }
    });
  }

  ngOnInit() {
    this.signIn.setFromUri('/auth/profile');
    this.widget.renderEl({
      el: '#okta-signin-container'},
      (res) => {
        if (res.status === 'SUCCESS') {
          this.signIn.loginRedirect('/auth/profile', {sessionToken: res.session.token });
          this.widget.hide();
        }
      },
      (err) => {
        throw err;
      }
    );
  }

}
