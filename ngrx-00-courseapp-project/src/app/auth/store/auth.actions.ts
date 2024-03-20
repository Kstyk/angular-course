import { createAction, props } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Login';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
export const LOGOUT = '[Auth] Logout';
export const SIGNUP_START = '[Auth] Signup Start';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';

export const authenticateSuccess = createAction(
  AUTHENTICATE_SUCCESS,
  props<{
    payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    };
  }>()
);

export const logout = createAction(LOGOUT);

export const authenticateFail = createAction(
  AUTHENTICATE_FAIL,
  props<{ payload: string }>()
);

export const loginStart = createAction(
  LOGIN_START,
  props<{ payload: { email: string; password: string } }>()
);

export const signupStart = createAction(
  SIGNUP_START,
  props<{ payload: { email: string; password: string } }>()
);

export const clearError = createAction(CLEAR_ERROR);

export const autoLogin = createAction(AUTO_LOGIN);
