import {RecipeType} from '../../../../recipe/src/app/recipe/recipe';

export interface Cookbook {
  // the user this cookbook belongs to.
  userId: string;
  // this is nothing more than a list of recipe ids.
  // this is nothing more than a list of recipe <--> types
  recipes: CookbookEntry[];
}

export interface CookbookEntry {
  recipeId: string;
  recipeType: RecipeType;
}
