import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = '[ShoppingList] AddIngredient';

export const addIngredient = createAction(
  ADD_INGREDIENT,
  props<{ value: Ingredient }>()
);
