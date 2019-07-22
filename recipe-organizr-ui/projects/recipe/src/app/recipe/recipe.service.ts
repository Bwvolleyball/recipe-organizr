import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe, RecipeType} from './recipe';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipeByIdBaseUrl = '/api/recipe/';

  constructor(private http: HttpClient) {
  }

  randomRecipe(random: string): Observable<Recipe> {
    return this.http.get<Recipe>(this.recipeByIdBaseUrl + random);
  }

  findById(recipeType: RecipeType, id: string): Observable<Recipe> {
    return this.http.get<Recipe>(this.recipeByIdBaseUrl + recipeType.toLocaleString() + '/' + id);
  }
}
