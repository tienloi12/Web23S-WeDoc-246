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
  on(UserActions.createUser, (state) => ({ ...state, loading: true })),
  on(UserActions.createUserSuccess, (state, action) => {
    console.log(action.type);
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
  on(UserActions.getUserById, (state) => ({ ...state, loading: true })),
  on(UserActions.getUserByIdSuccess, (state, action) => {
    console.log(action.type);
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
  on(UserActions.getUserByGmail, (state) => ({ ...state, loading: true })),
  on(UserActions.getUserByGmailSuccess, (state, action) => {
    console.log(action.type);
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
  on(UserActions.clearUser, (state, action) => {
    console.log(action.type);

    return {
      ...state,
      user: <UserModel>{},
      loading: false,
      error: '',
      isSuccessful: false,
    };
  })
);
