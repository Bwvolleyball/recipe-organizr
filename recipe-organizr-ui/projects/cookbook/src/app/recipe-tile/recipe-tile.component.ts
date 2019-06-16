import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from '../../../../recipe/src/app/recipe/recipe';
import {RecipeService} from '../../../../recipe/src/app/recipe/recipe.service';

@Component({
  selector: 'cookbook-recipe-tile',
  templateUrl: './recipe-tile.component.html',
  styleUrls: ['./recipe-tile.component.scss']
})
export class RecipeTileComponent implements OnInit {

  @Input() recipeId: string;

  @Output() recipeNameEmitter = new EventEmitter<string>();

  recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.findById(this.recipeId).subscribe(recipe => this.receiveRecipe(recipe));
  }

  private receiveRecipe(recipe: Recipe) {
    this.recipe = recipe;
    this.recipeNameEmitter.emit(recipe.name);
  }

}
