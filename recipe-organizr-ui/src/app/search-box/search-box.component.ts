import {Component, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {RecipeSearchService} from '../../../projects/recipe/src/app/recipe-search/recipe-search.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  faSearch = faSearch;
  searchName = '';
  searchResults: string[] = [];
  activated: boolean[] = [];

  constructor(private recipeSearchService: RecipeSearchService) {
  }

  ngOnInit() {
    this.recipeSearchService.predictions().subscribe(results => this.searchResults = results);
  }

  searchUpdated() {
    console.log('New search: ' + this.searchName);
    this.recipeSearchService.predict(this.searchName);
  }

  searchRecipes() {
    console.log('Starting search for: ' + this.searchName);
  }

  selectRecipe(name: string) {
    console.log('Selected recipe: ' + name);
  }
}
