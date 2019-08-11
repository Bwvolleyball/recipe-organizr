import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeSearchService} from '../recipe-search/recipe-search.service';
import {Recipe} from '../recipe/recipe';
import {Subscription} from 'rxjs';

@Component({
  selector: 'recipe-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private recipeSearchService: RecipeSearchService, private router: Router) {
  }

  searchTerm: string;
  recipes: Map<string, Recipe[]>;
  activated: Map<string, boolean[]>;

  recipesSubscription: Subscription;

  private static updatedList(recipe: Recipe, list: Recipe[]): Recipe[] {
    if (list) {
      list.push(recipe);
    } else {
      list = [recipe];
    }
    return list;
  }

  ngOnInit() {
    this.searchTerm = this.route.snapshot.paramMap.get('search');
    this.recipesSubscription = this.recipeSearchService
      .search(this.searchTerm, 25)
      .subscribe(recipes => {
        this.recipes = this.groupRecipes(recipes);
        this.activated = this.copyToActivated(this.recipes);
      });
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }

  selectRecipe(id: number) {
    this.router.navigateByUrl('/recipe/detail/' + id);
  }

  /**
   * Groups recipes based on category and returns a map with these items grouped.
   *
   * @param recipes list
   */
  private groupRecipes(recipes: Recipe[]): Map<string, Recipe[]> {
    const map = new Map<string, Recipe[]>();
    recipes.forEach((recipe) => {
      let list = map.get(recipe.category);
      list = RecipeListComponent.updatedList(recipe, list);
      map.set(recipe.category, list);
    });
    return map;
  }

  private copyToActivated(recipes: Map<string, any[]>): Map<string, boolean[]> {
    const map = new Map<string, boolean[]>();
    recipes.forEach((value, key) => {
      map.set(key, new Array(value.length).fill(false));
    });
    return map;
  }
}
