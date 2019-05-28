import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, concat, Observable, of, Subscription} from 'rxjs';
import {Recipe} from '../recipe/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeSearchService {
  private predictionUrl = '/api/recipe/predict?limit=%limit%&name=%name%';
  private searchUrl = 'api/recipe/search?limit=%limit%&name=%name%';

  private predictionSubscription: Subscription = Subscription.EMPTY;
  private predictionSubject = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {
  }

  predictions(): Observable<string[]> {
    return this.predictionSubject.asObservable();
  }

  predict(name: string, limit: number = 7) {
    if (!this.predictionSubscription.closed) {
      this.predictionSubscription.unsubscribe();
    }
    const url = this.predictionUrl.replace('%limit%', limit.toString()) .replace('%name%', name);
    const next: Observable<string[]> = name.trim() === '' ? of([]) : this.http.get<string[]>(url);

    this.predictionSubscription = next.subscribe(results => this.predictionSubject.next(results));
  }

  search(name: string, limit: number = 1): Observable<Recipe[]> {
    const url = this.searchUrl.replace('%limit%', limit.toString()).replace('%name%', name);
    return name.trim() === '' ? of([]) : this.http.get<Recipe[]>(url);
  }
}
