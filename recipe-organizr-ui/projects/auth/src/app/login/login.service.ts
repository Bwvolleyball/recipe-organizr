import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login} from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public login(idToken: string, accessToken: string, authenticated: boolean) {
    const login: Login = {idToken, accessToken, authenticated};
    this.http.post('/api/auth/login', login).subscribe(success => console.log('Successfully logged in!'),
        error => console.error('Got an error! %o', error));
  }
}
