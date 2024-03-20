import { recipeStateType } from './recipe.reducer';

export const selectRecipes = (state: { recipes: recipeStateType }) =>
  state.recipes;
