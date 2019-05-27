import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RecipeService} from '../recipe/recipe.service';
import {Recipe} from '../recipe/recipe';

@Component({
  selector: 'recipe-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {
  }

  recipeId: string;
  recipe: Recipe;

  private static onError(error) {
    console.error('Failed to retrieve a recipe!', error);
    // TODO: should I route them to a page not found component? Display an error?
  }

  ngOnInit() {
    this.recipeId = this.route.snapshot.paramMap.get('id');
    this.recipeService.findById(Number(this.recipeId)).subscribe(
      recipe => this.recipe = recipe,
      error => RecipeDetailComponent.onError(error));
  }

  private logRecipe() {
    console.log('recipe: %o', this.recipe);
  }
}
