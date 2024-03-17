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
    const ingredient = state.ingredients[state.editedIngredientIndex];
    const updatedIngredient = {
      ...ingredient,
      ...action.value,
    };

    const updatedIngredients = [...state.ingredients];
    updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredientIndex: -1,
      editedIngredient: null,
    };
  }),
  on(deleteIngredient, (state, action) => {
    return {
      ...state,
      ingredients: state.ingredients.filter((e, index) => {
        return index !== state.editedIngredientIndex;
      }),
      editedIngredientIndex: -1,
      editedIngredient: null,
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
