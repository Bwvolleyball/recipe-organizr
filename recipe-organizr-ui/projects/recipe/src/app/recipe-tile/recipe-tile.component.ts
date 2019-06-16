import {Component, Input, OnInit} from '@angular/core';
import {RecipeService} from '../recipe/recipe.service';
import {Recipe} from '../recipe/recipe';

@Component({
  selector: 'recipe-recipe-tile',
  templateUrl: './recipe-tile.component.html',
  styleUrls: ['./recipe-tile.component.scss']
})
export class RecipeTileComponent implements OnInit {

  @Input() recipeId: string;

  recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.findById(this.recipeId).subscribe(recipe => this.recipe = recipe)
  }

}
