import { shoppingListStateType } from './shopping-list.reducer';

export const selectShoppingList = (state: {
  shoppingList: shoppingListStateType;
}) => state.shoppingList;
