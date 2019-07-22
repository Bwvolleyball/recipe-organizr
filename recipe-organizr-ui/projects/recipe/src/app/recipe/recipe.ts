export class Recipe {
  id: number;
  name: string;
  category: string;
  locale: string;
  instructions: string[];
  thumbnail: string;
  tags: string[];
  video: string;
  source: string;
  ingredients: Ingredient[];
  recipeType: RecipeType;
}

export class Ingredient {
  name: string;
  amount: string;
}

export enum RecipeType {
  MEAL = 'MEAL',
  DRINK = 'DRINK',
}

export class RecipeTypeHelper {
  static fromString(name: string): RecipeType {
    const upperCased = name.toLocaleUpperCase();
    if (upperCased === RecipeType.MEAL.toString()) {
      return RecipeType.MEAL;
    } else if (upperCased === RecipeType.DRINK.toString()) {
      return RecipeType.DRINK;
    } else {
      // this is the default.
      return RecipeType.MEAL;
    }
  }
}
