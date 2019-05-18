import {Injectable} from '@angular/core';
import {AuthService, SocialUser} from 'angularx-social-login';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: Subject<SocialUser> = new Subject<SocialUser>();
  private loggedIn: Subject<boolean> = new Subject<boolean>();

  constructor(private authService: AuthService) {
    this.user.next(null);
  }

  signIn(providerId: string): void {
    this.authService.signIn(providerId).then((user) => this.setUser(user));
  }

  public logOutUser(){
    this.authService.signOut(true).then(() => console.log('Successfully logged you out!'));
    this.setUser(null);
  }

  public getUser(): Subject<SocialUser> {
    return this.user;
  }

  setUser(user: SocialUser): void {
    this.user.next(user);
    this.loggedIn.next(user != null);
  }

  public isLoggedIn(): Subject<boolean> {
    return this.loggedIn;
  }
}
