import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RecipeService} from '../recipe/recipe.service';
import {Recipe, RecipeType, RecipeTypeHelper} from '../recipe/recipe';
import {Subscription} from 'rxjs';
import {LoginService} from '../../../../auth/src/app/login/login.service';

@Component({
  selector: 'recipe-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private loginService: LoginService) {
  }

  recipeType: RecipeType;
  recipeId: string;
  recipe: Recipe;

  recipeSubscription: Subscription;

  addEnabled = true;
  authenticated: boolean;

  private static onError(error) {
    console.error('Failed to retrieve a recipe!', error);
    // TODO: should I route them to a page not found component? Display an error?
  }

  ngOnInit() {
    const random = this.route.snapshot.paramMap.get('random');
    if (random) {
      this.recipeSubscription = this.recipeService.randomRecipe(random)
        .subscribe(
        recipe => this.recipe = recipe,
        error => RecipeDetailComponent.onError(error));
    } else {
      this.recipeType = RecipeTypeHelper.fromString(this.route.snapshot.paramMap.get('type'));
      this.recipeId = this.route.snapshot.paramMap.get('id');
      this.recipeSubscription = this.recipeService.findById(this.recipeType, this.recipeId).subscribe(
        recipe => this.recipe = recipe,
        error => RecipeDetailComponent.onError(error));
    }
    this.loginService.authenticated().then(authenticated => this.authenticated = authenticated);
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
