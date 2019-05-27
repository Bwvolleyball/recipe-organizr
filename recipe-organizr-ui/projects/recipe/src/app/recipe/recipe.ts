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
}

export class Ingredient {
  name: string;
  amount: string;
}
