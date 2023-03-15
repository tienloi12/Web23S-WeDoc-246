import { createAction, props } from '@ngrx/store';
import { UserModel } from 'src/app/models/user.model';

//create user
export const createUser = createAction(
  '[User] Create User',
  props<{ user: UserModel }>()
);
export const createUserSuccess = createAction(
  '[User] Create User Success',
  props<{ user: UserModel }>()
);
export const createUserFailure = createAction(
  '[User] Create User Failure',
  props<{ error: string }>()
);

//get user by gmail
export const getUserByGmail = createAction(
  '[User] Get User By Gmail',
  props<{ email: string }>()
);
export const getUserByGmailSuccess = createAction(
  '[User] Get User Success',
  props<{ user: UserModel }>()
);
export const getUserByGmailFailure = createAction(
  '[User] Get User Failure',
  props<{ error: string }>()
);

//get user by id
export const getUserById = createAction(
  '[User] Get User By Id',
  props<{ id: string }>()
);
export const getUserByIdSuccess = createAction(
  '[User] Get User By Id Success',
  props<{ user: UserModel }>()
);
export const getUserByIdFailure = createAction(
  '[User] Get User By Id Failure',
  props<{ error: string }>()
);

//clear user
export const clearUser = createAction('[User] Clear User');
