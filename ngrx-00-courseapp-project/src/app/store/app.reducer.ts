import { ActionReducerMap } from '@ngrx/store';
import { authReducer, authStateType } from '../auth/store/auth.reducer';
import {
  shoppingListReducer,
  shoppingListStateType,
} from '../shopping-list/store/shopping-list.reducer';

export type AppStateType = {
  shoppingList: shoppingListStateType;
  auth: authStateType;
};

export const appReducer: ActionReducerMap<AppStateType> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
};
