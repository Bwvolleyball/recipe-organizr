import {Component, OnInit} from '@angular/core';
import {CookbookService} from '../cookbook/cookbook.service';
import {Cookbook} from '../cookbook/cookbook';
import {KeyValue} from '@angular/common';

class NamedRecipe {
  recipeId = '';
  recipeName = '';

  compare(other: NamedRecipe): number {
    return this.recipeName.localeCompare(other.recipeName);
  }
}

@Component({
  selector: 'cookbook-cookbook-view',
  templateUrl: './cookbook-view.component.html',
  styleUrls: ['./cookbook-view.component.scss']
})
export class CookbookViewComponent implements OnInit {

  cookbook: Cookbook;
  mappedRecipes = new Map<string, NamedRecipe>();

  nameComparatsor = (a: KeyValue<string, NamedRecipe>, b: KeyValue<string, NamedRecipe>): number => {
    return a.value.compare(b.value);
  }

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

  attachName(recipeId: string, recipeName: string) {
    this.mappedRecipes.get(recipeId).recipeName = recipeName;
    this.sortRecipes();
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

  private asArray<V>(values: IterableIterator<V>): Array<V> {
    return Array.from(values);
  }
}
