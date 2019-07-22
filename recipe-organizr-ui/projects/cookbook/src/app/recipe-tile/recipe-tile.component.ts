import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe, RecipeType} from '../../../../recipe/src/app/recipe/recipe';
import {RecipeService} from '../../../../recipe/src/app/recipe/recipe.service';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';

@Component({
  selector: 'cookbook-recipe-tile',
  templateUrl: './recipe-tile.component.html',
  styleUrls: ['./recipe-tile.component.scss']
})
export class RecipeTileComponent implements OnInit {

  isVisible = true;

  @Input() recipeType: RecipeType;
  @Input() recipeId: string;

  // locale, category, tags
  @Input() set filters(filters: [string, string, string]) {
    const locale = filters[0];
    const category = filters[1];
    const tagsString = filters[2];
    const tags = tagsString === undefined ? undefined : tagsString.split(',');

    const localeMatch = locale === undefined ? true : this.recipe.locale === locale;
    const categoryMatch = category === undefined ? true : this.recipe.category === category;
    const tagsMatch = tags === undefined ? true : this.tagsMatch(tags);

    this.isVisible = localeMatch && categoryMatch && tagsMatch;
    this.visibleEmitter.emit([this.recipeId, this.isVisible]);
  }

  @Output() deleteEmitter = new EventEmitter<string>();

  @Output() recipeEmitter = new EventEmitter<Recipe>();

  @Output() visibleEmitter = new EventEmitter<[string, boolean]>();

  faTrash = faTrash;

  recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.findById(this.recipeType, this.recipeId).subscribe(recipe => this.receiveRecipe(recipe));
  }

  deleteMe(event) {
    event.stopPropagation();
    this.deleteEmitter.emit(this.recipeId);
  }

  private receiveRecipe(recipe: Recipe) {
    this.recipe = recipe;
    this.recipeEmitter.emit(recipe);
  }

  private tagsMatch(tags: string[]): boolean {
    const rTags = this.recipe.tags;
    return tags.every(v => rTags.includes(v));
  }
}
