import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cookbook} from './cookbook';
import {LoginService} from '../../../../auth/src/app/login/login.service';
import {Observable} from 'rxjs';

const COOKBOOK_API = '/api/cookbook/';

@Injectable({
  providedIn: 'root'
})
export class CookbookService {

  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  public getCookbook(): Observable<Cookbook> {
    const user = this.loginService.user();
    return this.http.get<Cookbook>(`${COOKBOOK_API}${user.userId}`);
  }

  public saveCookbook(cookbook: Cookbook): Observable<Cookbook> {
    return this.http.post<Cookbook>(`${COOKBOOK_API}${cookbook.userId}`, cookbook.recipes);
  }

  public deleteCookbook(cookbook: Cookbook): Observable<void> {
    return this.http.delete<void>(`${COOKBOOK_API}${cookbook.userId}`);
  }
}
