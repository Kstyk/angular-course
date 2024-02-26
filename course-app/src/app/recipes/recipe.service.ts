import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super tasty Schnitzel',
      'https://www.picng.com/upload/schnitzel/png_schnitzel_16029.png',
      [new Ingredient('Meat', 1), new Ingredient('French Fires', 20)]
    ),
    new Recipe(
      'Pizza włoska2',
      'Pyszne włoskie ciasta z dodatkami',
      'https://www.pizzerie.rzeszow.pl/wp-content/uploads/2016/05/PIZZERIE-RZESZOW-pizzeria-red-chilli-pizza.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Tomato', 5)]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
