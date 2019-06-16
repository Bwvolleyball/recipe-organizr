import { Component, OnInit } from '@angular/core';
import {CookbookService} from '../cookbook/cookbook.service';
import {Cookbook} from '../cookbook/cookbook';

class NamedRecipe {
  recipeId = '';
  recipeName = '';
}

@Component({
  selector: 'cookbook-cookbook-view',
  templateUrl: './cookbook-view.component.html',
  styleUrls: ['./cookbook-view.component.scss']
})
export class CookbookViewComponent implements OnInit {

  cookbook: Cookbook;
  sortedRecipes = new Array<NamedRecipe>();

  constructor(private cookbookService: CookbookService) { }

  ngOnInit() {
    this.cookbookService.getCookbook().subscribe(cookbook => this.receiveCookbook(cookbook));
  }

  private receiveCookbook(cookbook: Cookbook) {
    this.cookbook = cookbook;
    for (const recipe of cookbook.recipes) {
      const namedRecipe = new NamedRecipe();
      namedRecipe.recipeId = recipe;
      this.sortedRecipes.push(namedRecipe);
    }
  }

  attachName(recipeId: string, recipeName: string) {
    for (const recipe of this.sortedRecipes) {
      if (recipe.recipeId === recipeId) {
        recipe.recipeName = recipeName;
      }
    }
    this.sortedRecipes.sort((a, b) => a.recipeName.localeCompare(b.recipeName));
  }
}
