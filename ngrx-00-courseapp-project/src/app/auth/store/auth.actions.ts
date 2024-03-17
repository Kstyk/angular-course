import { createAction, props } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';

export const login = createAction(
  LOGIN,
  props<{
    payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    };
  }>()
);

export const logout = createAction(LOGOUT);

export const loginStart = createAction(
  LOGIN_START,
  props<{ payload: { email: string; password: string } }>()
);
