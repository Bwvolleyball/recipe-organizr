import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../projects/auth/src/app/user.service';
import {SocialUser} from 'angularx-social-login';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  private socialUser: SocialUser;
  private user = 'Guest';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe((socialUser) => this.receiveSocialUser(socialUser));
  }

  receiveSocialUser(socialUser: SocialUser): void {
    this.socialUser = socialUser;
    if (socialUser) {
      this.user = socialUser.firstName;
    } else {
      this.user = 'Guest';
    }
  }

  logOut(): void {
    this.userService.logOutUser();
    this.receiveSocialUser(null);
  }
}
