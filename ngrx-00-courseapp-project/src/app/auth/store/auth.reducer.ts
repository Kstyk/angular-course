import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import { login, logout } from './auth.actions';

export type authStateType = {
  user: User;
};

const initialState = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, action) => {
    const user = new User(
      action.payload.email,
      action.payload.userId,
      action.payload.token,
      action.payload.expirationDate
    );

    return {
      ...state,
      user: user,
    };
  }),
  on(logout, (state) => {
    return { ...state, user: null };
  })
);
