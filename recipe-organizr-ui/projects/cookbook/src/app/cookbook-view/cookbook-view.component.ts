import {Component, OnInit} from '@angular/core';
import {CookbookService} from '../cookbook/cookbook.service';
import {Cookbook, CookbookEntry} from '../cookbook/cookbook';
import {Recipe, RecipeType} from '../../../../recipe/src/app/recipe/recipe';
import {RecipeService} from '../../../../recipe/src/app/recipe/recipe.service';

class NamedRecipe {
  recipeType: RecipeType;
  recipeId = '';
  recipeName = '';

  compare(other: NamedRecipe): number {
    return this.recipeName.localeCompare(other.recipeName);
  }
}

interface LooseObject {
  [key: string]: boolean;
}

@Component({
  selector: 'cookbook-cookbook-view',
  templateUrl: './cookbook-view.component.html',
  styleUrls: ['./cookbook-view.component.scss']
})
export class CookbookViewComponent implements OnInit {

  cookbook: Cookbook;
  mappedRecipes = new Map<string, NamedRecipe>();
  localeSet = new Set<string>();
  categorySet = new Set<string>();
  tagsSet = new Set<string>();

  isSearchCollapsed = true;
  hideShowFilterBtnClass = 'btn-outline-success';
  hideShowFiltersText = 'Show';

  selectedLocale: string;
  selectedCategory: string;
  selectedTags: LooseObject = {};
  selectedTagsString: string;

  visibilityMatrix = new Map<string, boolean>();
  anyVisible = true;

  constructor(private cookbookService: CookbookService, private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.cookbookService.getCookbook().subscribe(cookbook => this.receiveCookbook(cookbook));
  }

  private receiveCookbook(cookbook: Cookbook) {
    this.cookbook = cookbook;
    for (const recipe of cookbook.recipes) {
      const namedRecipe = new NamedRecipe();
      namedRecipe.recipeType = recipe.recipeType;
      namedRecipe.recipeId = recipe.recipeId;
      this.mappedRecipes.set(recipe.recipeId, namedRecipe);
    }
    this.sortRecipes();
  }

  asArray<V>(values: IterableIterator<V>): Array<V> {
    return Array.from(values);
  }

  recipeEventReceiver(recipeId: string, recipe: Recipe) {
    this.mappedRecipes.get(recipeId).recipeName = recipe.name;
    this.sortRecipes();
    this.buildClickableFilters(recipe);
  }

  captureTags() {
    const selected = new Array<string>();
    this.tagsSet.forEach(tag => {
      const isSelected = this.selectedTags[tag];
      if (isSelected) {
        selected.push(tag);
      }
    });
    const finalTags = selected.toString();
    this.selectedTagsString = finalTags.trim().length > 0 ? finalTags : undefined;
  }

  receiveVisibility(visibliityPair: [string, boolean]) {
    this.visibilityMatrix.set(visibliityPair[0], visibliityPair[1]);
    this.anyVisible = Array.from(this.visibilityMatrix.values()).some(visible => visible === true);
  }

  toggleFilters() {
    this.isSearchCollapsed = !this.isSearchCollapsed;
    if (this.isSearchCollapsed) {
      this.hideShowFilterBtnClass = 'btn-outline-success';
      this.hideShowFiltersText = 'Show';
    } else {
      this.hideShowFilterBtnClass = 'btn-outline-danger';
      this.hideShowFiltersText = 'Hide';
    }
  }

  empty(...strings: string[]): boolean {
    return strings.some(value => value && value.length > 0);
  }

  clearFilters() {
    this.selectedLocale = undefined;
    this.selectedCategory = undefined;
    this.selectedTags = {};
    this.captureTags();
  }

  deleteRecipe(recipeId: string) {
    this.mappedRecipes.delete(recipeId);

    const recipes: CookbookEntry[] =
      Array.from(this.mappedRecipes.values())
        .map(namedRecipe => ({recipeId: namedRecipe.recipeId, recipeType: namedRecipe.recipeType}));

    const updatedCookbook: Cookbook = {
      userId: this.cookbook.userId,
      // tslint:disable-next-line:max-line-length
      recipes
    };
    this.cookbookService.saveCookbook(updatedCookbook).subscribe(cookbook => this.cookbook = cookbook);
    this.sortRecipes();
    this.rebuildClickableFilters();
  }

  private sortRecipes() {
    const entries = Array.from(this.mappedRecipes.entries());
    this.mappedRecipes = new Map<string, NamedRecipe>([...entries]
      .sort((a, b) => a[1].compare(b[1])));
  }

  private buildClickableFilters(recipe: Recipe) {
    if (recipe.locale) {
      this.localeSet.add(recipe.locale);
    }
    if (recipe.category) {
      this.categorySet.add(recipe.category);
    }
    recipe.tags.map(value => {
      this.tagsSet.add(value);
      this.selectedTags[value] = false;
    });
  }

  private rebuildClickableFilters() {
    this.localeSet = new Set<string>();
    this.categorySet = new Set<string>();
    this.tagsSet = new Set<string>();
    Array.from(this.mappedRecipes.values())
      .map(namedRecipe => this.recipeService.findById(namedRecipe.recipeType, namedRecipe.recipeId))
      .map(rObservable => rObservable.subscribe(recipe => this.buildClickableFilters(recipe)));
  }
}
