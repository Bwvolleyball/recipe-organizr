import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {UserClaims} from '@okta/okta-angular';

@Component({
  selector: 'auth-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: UserClaims;

  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService.user().subscribe((user) => {
      this.user = user;
    });
  }
}
