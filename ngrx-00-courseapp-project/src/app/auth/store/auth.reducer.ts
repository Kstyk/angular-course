import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import {
  authenticateFail,
  authenticateSuccess,
  clearError,
  loginStart,
  logout,
  signupStart,
} from './auth.actions';

export type authStateType = {
  user: User;
  authError: string;
  loading: boolean;
};

const initialState = {
  user: null,
  authError: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(authenticateSuccess, (state, action) => {
    const user = new User(
      action.payload.email,
      action.payload.userId,
      action.payload.token,
      action.payload.expirationDate
    );

    return {
      ...state,
      authError: null,
      user: user,
      loading: false,
    };
  }),
  on(logout, (state) => {
    return { ...state, user: null };
  }),
  on(loginStart, (state) => {
    return { ...state, authError: null, loading: true };
  }),
  on(signupStart, (state) => {
    return { ...state, authError: null, loading: true };
  }),
  on(authenticateFail, (state, action) => {
    return { ...state, authError: action.payload, user: null, loading: false };
  }),
  on(clearError, (state) => {
    return { ...state, authError: null };
  })
);
