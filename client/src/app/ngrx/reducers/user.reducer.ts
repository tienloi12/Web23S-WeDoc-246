import { createReducer, on } from '@ngrx/store';
import { UserModel } from 'src/app/models/user.model';
import * as UserActions from '../actions/user.action';
import { UserState } from '../states/user.state';

export const initialState: UserState = {
  user: <UserModel>{},
  loading: false,
  error: '',
  isSuccessful: false,
};

export const userReducer = createReducer(
  initialState,
  // Create User
  on(UserActions.createUser, (state) => ({ ...state, loading: true })),
  on(UserActions.createUserSuccess, (state, action) => {
    let newState = {
      ...state,
      loading: false,
      isSuccessful: true,
    };
    return newState;
  }),
  on(UserActions.createUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
    isSuccessful: false,
  })),

  // Get User By Id
  on(UserActions.getUserById, (state) => ({ ...state, loading: true })),
  on(UserActions.getUserByIdSuccess, (state, action) => {
    let newState = {
      ...state,
      user: action.user,
      loading: false,
      isSuccessful: true,
    };
    return newState;
  }),
  on(UserActions.getUserByIdFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
    isSuccessful: false,
  })),

  // Get User By Gmail
  on(UserActions.getUserByGmail, (state) => ({ ...state, loading: true })),
  on(UserActions.getUserByGmailSuccess, (state, action) => {
    let newState = {
      ...state,
      user: action.user,
      loading: false,
      isSuccessful: true,
    };
    return newState;
  }),
  on(UserActions.getUserByGmailFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
    isSuccessful: false,
  })),

  // Clear User
  on(UserActions.clearUser, (state, action) => {
    return {
      ...state,
      user: <UserModel>{},
      loading: false,
      error: '',
      isSuccessful: false,
    };
  })
);
