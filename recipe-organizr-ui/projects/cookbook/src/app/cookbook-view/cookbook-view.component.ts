import {Component, OnInit} from '@angular/core';
import {CookbookService} from '../cookbook/cookbook.service';
import {Cookbook} from '../cookbook/cookbook';
import {Recipe} from '../../../../recipe/src/app/recipe/recipe';

class NamedRecipe {
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

  selectedLocale: string;
  selectedCategory: string;
  selectedTags: LooseObject = {};
  selectedTagsString: string;

  visibilityMatrix = new Map<string, boolean>();
  anyVisible = true;

  constructor(private cookbookService: CookbookService) {
  }

  ngOnInit() {
    this.cookbookService.getCookbook().subscribe(cookbook => this.receiveCookbook(cookbook));
  }

  private receiveCookbook(cookbook: Cookbook) {
    this.cookbook = cookbook;
    for (const recipe of cookbook.recipes) {
      const namedRecipe = new NamedRecipe();
      namedRecipe.recipeId = recipe;
      this.mappedRecipes.set(recipe, namedRecipe);
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
    this.anyVisible = Array.from(this.visibilityMatrix.values()).some( visible => visible === true);
  }

  deleteRecipe(recipeId: string) {
    this.mappedRecipes.delete(recipeId);

    const updatedCookbook: Cookbook = {
      userId: this.cookbook.userId,
      recipes: Array.from(this.mappedRecipes.values()).map(recipe => recipe.recipeId)
    };
    this.cookbookService.saveCookbook(updatedCookbook).subscribe(cookbook => this.cookbook = cookbook);
    this.sortRecipes();
  }

  private sortRecipes() {
    const entries = Array.from(this.mappedRecipes.entries());
    this.mappedRecipes = new Map<string, NamedRecipe>([...entries]
      .sort((a, b) => a[1].compare(b[1])));
  }

  private buildClickableFilters(recipe: Recipe) {
    this.localeSet.add(recipe.locale);
    this.categorySet.add(recipe.category);
    recipe.tags.map(value => {
      this.tagsSet.add(value);
      this.selectedTags[value] = false;
    });
  }
}
