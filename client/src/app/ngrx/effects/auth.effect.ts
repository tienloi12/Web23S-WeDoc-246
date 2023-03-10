import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import * as AuthActions from '../actions/auth.action';
@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(() => this.authService.loginWithGoogle()),
      map(() => AuthActions.loginSuccess()),
      catchError((error) => of(AuthActions.loginFailure({ error })))
    );
  });

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(async () => this.authService.logOut()),
      map(() => AuthActions.logoutSuccess()),
      catchError((error) => of(AuthActions.logoutFailure({ error: error })))
    )
  );
}
