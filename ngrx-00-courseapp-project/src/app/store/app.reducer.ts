import { ActionReducerMap } from '@ngrx/store';
import { authReducer, authStateType } from '../auth/store/auth.reducer';
import {
  shoppingListReducer,
  shoppingListStateType,
} from '../shopping-list/store/shopping-list.reducer';
import {
  recipeReducer,
  recipeStateType,
} from '../recipes/store/recipe.reducer';

export type AppStateType = {
  shoppingList: shoppingListStateType;
  auth: authStateType;
  recipes: recipeStateType;
};

export const appReducer: ActionReducerMap<AppStateType> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
  recipes: recipeReducer,
};
