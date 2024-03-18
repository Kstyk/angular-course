import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOGIN_START, login, loginFail } from './auth.actions';
import { catchError, map, of, switchMap, tap, throwError } from 'rxjs';
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

@Injectable()
export class AuthEffects {
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
                const expirationDate = new Date(
                  new Date().getTime() + +resData.expiresIn * 1000
                );
                return login({
                  payload: {
                    email: resData.email,
                    userId: resData.localId,
                    token: resData.idToken,
                    expirationDate: expirationDate,
                  },
                });
              }),
              catchError((errorRes) => {
                let errorMessage = 'An unknown error occurred!';
                if (!errorRes.error || !errorRes.error.error) {
                  return of(loginFail({ payload: errorMessage }));
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
                return of(loginFail({ payload: errorMessage }));
              })
            );
        }
      )
    )
  );

  authSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(login),
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
