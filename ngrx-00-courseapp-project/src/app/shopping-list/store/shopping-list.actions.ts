import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = '[ShoppingList] AddIngredient';
export const ADD_INGREDIENTS = '[ShoppingList] AddIngredients';
export const UPDATE_INGREDIENT = '[ShoppingList] UpdateIngredient';
export const DELETE_INGREDIENT = '[ShoppingList] DeleteIngredient';
export const START_EDIT = '[ShoppingList] StartEdit';
export const STOP_EDIT = '[ShoppingList] StopEdit';

export const addIngredient = createAction(
  ADD_INGREDIENT,
  props<{ value: Ingredient }>()
);

export const addIngredients = createAction(
  ADD_INGREDIENTS,
  props<{ value: Ingredient[] }>()
);

export const updateIngredient = createAction(
  UPDATE_INGREDIENT,
  props<{ value: Ingredient }>()
);

export const deleteIngredient = createAction(DELETE_INGREDIENT);

export const startEdit = createAction(START_EDIT, props<{ index: number }>());
export const stopEdit = createAction(STOP_EDIT);
