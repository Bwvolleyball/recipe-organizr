import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, concat, Observable, of, Subscription} from 'rxjs';
import {Recipe} from '../recipe/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeSearchService {
  private predictionUrl = '/api/recipe/predict?limit=7&name=';
  private searchUrl = 'api/recipe/search?name=';

  private predictionSubscription: Subscription = Subscription.EMPTY;
  private predictionSubject = new BehaviorSubject<string[]>([]);

  private searchSubscription: Subscription = Subscription.EMPTY;
  private searchSubject = new BehaviorSubject<Recipe[]>([]);


  constructor(private http: HttpClient) {
  }

  predictions(): Observable<string[]> {
    return this.predictionSubject.asObservable();
  }

  searchResults(): Observable<Recipe[]> {
    return this.searchSubject.asObservable();
  }

  predict(name: string) {
    if (!this.predictionSubscription.closed) {
      this.predictionSubscription.unsubscribe();
    }
    const url = this.predictionUrl + name;
    const next: Observable<string[]> = name.trim() === '' ? of([]) : this.http.get<string[]>(url);

    this.predictionSubscription = next.subscribe(results => this.predictionSubject.next(results));
  }

  search(name: string) {
    if (!this.searchSubscription.closed) {
      this.searchSubscription.unsubscribe();
    }
    const url = this.searchUrl + name;
    const next: Observable<Recipe[]> = name.trim() === '' ? of([]) : this.http.get<Recipe[]>(url);
    this.searchSubscription = next.subscribe(results => this.searchSubject.next(results));
  }
}
