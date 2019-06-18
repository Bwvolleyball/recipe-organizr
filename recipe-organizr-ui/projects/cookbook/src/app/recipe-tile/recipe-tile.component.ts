import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from '../../../../recipe/src/app/recipe/recipe';
import {RecipeService} from '../../../../recipe/src/app/recipe/recipe.service';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';

@Component({
  selector: 'cookbook-recipe-tile',
  templateUrl: './recipe-tile.component.html',
  styleUrls: ['./recipe-tile.component.scss']
})
export class RecipeTileComponent implements OnInit {

  @Input() recipeId: string;

  @Output() recipeNameEmitter = new EventEmitter<string>();

  @Output() deleteEmitter = new EventEmitter<string>();

  faTrash = faTrash;

  recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.findById(this.recipeId).subscribe(recipe => this.receiveRecipe(recipe));
  }

  private receiveRecipe(recipe: Recipe) {
    this.recipe = recipe;
    this.recipeNameEmitter.emit(recipe.name);
  }

  private deleteMe(event) {
    event.stopPropagation();
    this.deleteEmitter.emit(this.recipeId);
  }

}
