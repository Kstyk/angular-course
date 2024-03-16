import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import {
  addIngredient,
  addIngredients,
  deleteIngredient,
  startEdit,
  stopEdit,
  updateIngredient,
} from './shopping-list.actions';

export type shoppingListStateType = {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
};

const initialState: shoppingListStateType = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export const shoppingListReducer = createReducer(
  initialState,
  on(addIngredient, (state, action) => {
    return { ...state, ingredients: [...state.ingredients, action.value] };
  }),
  on(addIngredients, (state, action) => {
    return { ...state, ingredients: [...state.ingredients, ...action.value] };
  }),
  on(updateIngredient, (state, action) => {
    const ingredient = state.ingredients[action.value.index];
    const updatedIngredient = {
      ...ingredient,
      ...action.value.ingredient,
    };

    const updatedIngredients = [...state.ingredients];
    updatedIngredients[action.value.index] = updatedIngredient;

    return {
      ...state,
      ingredients: updatedIngredients,
    };
  }),
  on(deleteIngredient, (state, action) => {
    return {
      ...state,
      ingredients: state.ingredients.filter((e, index) => {
        return index !== action.value;
      }),
    };
  }),
  on(startEdit, (state, action) => {
    return {
      ...state,
      editedIngredientIndex: action.index,
      editedIngredient: { ...state.ingredients[action.index] },
    };
  }),
  on(stopEdit, (state, action) => {
    return {
      ...state,
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  })
);
