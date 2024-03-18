import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  LOGIN_START,
  authenticateFail,
  authenticateSuccess,
  signupStart,
} from './auth.actions';
import { catchError, map, of, pipe, switchMap, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
  return authenticateSuccess({
    payload: {
      email: email,
      userId: userId,
      token: token,
      expirationDate: expirationDate,
    },
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(authenticateFail({ payload: errorMessage }));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(authenticateFail({ payload: errorMessage }));
};

@Injectable()
export class AuthEffects {
  authSignup = createEffect(() =>
    this.actions$.pipe(
      ofType(signupStart),
      // Alternative syntax:
      // ofType(AuthActions.loginStart),
      switchMap(
        (signupAction: { payload: { email: string; password: string } }) => {
          return this.http
            .post<AuthResponseData>(
              'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
                environment.firebaseAPIKey,
              {
                email: signupAction.payload.email,
                password: signupAction.payload.password,
                returnSecureToken: true,
              }
            )
            .pipe(
              map((resData) => {
                return handleAuthentication(
                  +resData.expiresIn,
                  resData.email,
                  resData.localId,
                  resData.idToken
                );
              }),
              catchError((errorRes) => {
                return handleError(errorRes);
              })
            );
        }
      )
    )
  );

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(LOGIN_START),
      // Alternative syntax:
      // ofType(AuthActions.loginStart),
      switchMap(
        (authData: { payload: { email: string; password: string } }) => {
          return this.http
            .post<AuthResponseData>(
              'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
                environment.firebaseAPIKey,
              {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true,
              }
            )
            .pipe(
              map((resData) => {
                return handleAuthentication(
                  +resData.expiresIn,
                  resData.email,
                  resData.localId,
                  resData.idToken
                );
              }),
              catchError((errorRes) => {
                return handleError(errorRes);
              })
            );
        }
      )
    )
  );

  authSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authenticateSuccess),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
