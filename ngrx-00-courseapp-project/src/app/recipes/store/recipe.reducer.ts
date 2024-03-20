import { createReducer, on } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import {
  addRecipe,
  deleteRecipe,
  setRecipes,
  updateRecipe,
} from './recipe.actions';

export type recipeStateType = {
  recipes: Recipe[];
};

const initialState: recipeStateType = {
  recipes: [],
};

export const recipeReducer = createReducer(
  initialState,
  on(setRecipes, (state, action) => {
    return { ...state, recipes: [...action.payload] };
  }),
  on(addRecipe, (state, action) => {
    return { ...state, recipes: [...state.recipes, action.payload] };
  }),
  on(updateRecipe, (state, action) => {
    const updatedRecipe = {
      ...state.recipes[action.payload.index],
      ...action.payload.newRecipe,
    };

    const updatedRecipes = [...state.recipes];
    updatedRecipes[action.payload.index] = updatedRecipe;

    return {
      ...state,
      recipes: updatedRecipes,
    };
  }),
  on(deleteRecipe, (state, action) => {
    return {
      ...state,
      recipes: state.recipes.filter((recipe, index) => {
        return index !== action.payload;
      }),
    };
  })
);
