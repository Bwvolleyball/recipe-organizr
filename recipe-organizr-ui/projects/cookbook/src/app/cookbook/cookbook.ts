export interface Cookbook {
  // the user this cookbook belongs to.
  userId: string;
  // this is nothing more than a list of recipe ids.
  recipes: string[];
}
