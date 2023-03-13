import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import * as UserActions from '../actions/user.action';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.createUser),
      switchMap((action) => {
        console.log(action);
        return this.userService.post(action.user);
      }),
      map((user) => {
        return UserActions.createUserSuccess({ user: <UserModel>user });
      }),
      catchError((error) => of(UserActions.createUserFailure({ error })))
    );
  });

  getUserById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getUserById),
      switchMap((action) => {
        return this.userService.getProfile(action.id);
      }),
      map((user) => {
        return UserActions.getUserByIdSuccess({ user });
      }),
      catchError((error) => of(UserActions.getUserByIdFailure({ error })))
    );
  });

  getUserByGmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getUserByGmail),
      switchMap((action) => {
        return this.userService.getProfileByEmail(action.email);
      }),
      map((user) => {
        return UserActions.getUserByGmailSuccess({ user });
      }),
      catchError((error) => of(UserActions.getUserByGmailFailure({ error })))
    );
  });
}
