import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import { addIngredient } from './shopping-list.actions';

export type shoppingListStateType = {
  ingredients: Ingredient[];
};

const initialState: shoppingListStateType = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
};

export const shoppingListReducer = createReducer(
  initialState,
  on(addIngredient, (state, action) => {
    return { ...state, ingredients: [...state.ingredients, action.value] };
  })
);
