import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from './recipe';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipeByIdBaseUrl = '/api/recipe/';

  constructor(private http: HttpClient) {
  }

  findById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(this.recipeByIdBaseUrl + id);
  }
}