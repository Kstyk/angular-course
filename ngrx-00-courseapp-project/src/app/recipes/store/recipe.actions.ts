import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const STORE_RECIPES = '[Recipes] Store Recipes';
export const ADD_RECIPE = '[Recipe] Add Recipe';
export const EDIT_RECIPE = '[Recipe] Edit Recipe';
export const DELETE_RECIPE = '[Recipe] Delete Recipe';

export const setRecipes = createAction(
  SET_RECIPES,
  props<{ payload: Recipe[] }>()
);

export const fetchRecipes = createAction(FETCH_RECIPES);
export const storeRecipes = createAction(STORE_RECIPES);
export const addRecipe = createAction(ADD_RECIPE, props<{ payload: Recipe }>());
export const updateRecipe = createAction(
  EDIT_RECIPE,
  props<{ payload: { index: number; newRecipe: Recipe } }>()
);
export const deleteRecipe = createAction(
  DELETE_RECIPE,
  props<{ payload: number }>()
);
