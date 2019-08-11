import {Component, OnDestroy, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {RecipeSearchService} from '../../../projects/recipe/src/app/recipe-search/recipe-search.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {RecipeType} from '../../../projects/recipe/src/app/recipe/recipe';


@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  faSearch = faSearch;
  searchName = '';
  searchResults: [string, RecipeType][] = [];
  activated: boolean[] = [];

  predictionSubscription: Subscription;

  constructor(private recipeSearchService: RecipeSearchService,
              private router: Router) {
  }

  ngOnInit() {
    this.predictionSubscription = this.recipeSearchService.predictions().subscribe(results => {
      this.searchResults = results;
    });
  }

  ngOnDestroy(): void {
    this.predictionSubscription.unsubscribe();
  }

  searchUpdated(override?: string) {
    const searchTerm = override === undefined ? this.searchName : override;
    this.recipeSearchService.predict(searchTerm);
  }

  searchRecipes() {
    this.router.navigateByUrl('/recipe/list/' + this.searchName).then(() => this.resetSearchResults());
  }

  selectRecipe(selection: [string, RecipeType]) {
    this.recipeSearchService.search(selection[0])
      .subscribe(recipe =>
        this.router.navigateByUrl('/recipe/detail/' + recipe[0].recipeType.toString().toLocaleLowerCase() + '/' + recipe[0].id));
    this.resetSearchResults();
  }

  private resetSearchResults() {
    // We need to wipe out the observable's pre-fill list.
    this.searchUpdated('');
  }
}
