import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, concat, Observable, of, Subscription} from 'rxjs';
import {Recipe, RecipeType, RecipeTypeHelper} from '../recipe/recipe';

class Pair {
  first: string;
  second: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeSearchService {
  private predictionUrl = '/api/recipe/predict?limit=%limit%&name=%name%';
  private searchUrl = 'api/recipe/search?limit=%limit%&name=%name%';

  private predictionSubscription: Subscription = Subscription.EMPTY;
  private predictionSubject = new BehaviorSubject<[string, RecipeType][]>([]);

  constructor(private http: HttpClient) {
  }

  predictions(): Observable<[string, RecipeType][]> {
    return this.predictionSubject.asObservable();
  }

  predict(name: string, limit: number = 7) {
    if (!this.predictionSubscription.closed) {
      this.predictionSubscription.unsubscribe();
    }
    const url = this.predictionUrl.replace('%limit%', limit.toString()).replace('%name%', name);
    const next: Observable<Pair[]> = name.trim() === '' ? of([]) : this.http.get<Pair[]>(url);

    this.predictionSubscription = next
      .subscribe(results =>
        this.predictionSubject.next(
          results.map(value =>
            [value.first, RecipeTypeHelper.fromString(value.second)])));
  }

  search(name: string, limit: number = 1): Observable<Recipe[]> {
    const url = this.searchUrl.replace('%limit%', limit.toString()).replace('%name%', name);
    return name.trim() === '' ? of([]) : this.http.get<Recipe[]>(url);
  }
}
