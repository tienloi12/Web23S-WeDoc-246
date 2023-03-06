import { createReducer, on } from '@ngrx/store';
import {
  createUser,
  createUserFailure,
  createUserSuccess,
  getUser,
  getUserFailure,
  getUserSuccess,
} from '../actions/createuser.action';
import { AuthState } from '../states/auth.state';

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: '',
  isSuccessful: false,
};

export const createUserReducer = createReducer(
  initialState,
  on(createUser, (state) => ({ ...state, loading: true })),
  on(createUserSuccess, (state, action) => {
    console.log(action);
    let newState = {
      ...state,
      user: action.user,
      loading: false,
      isSuccessful: true,
    };
    console.log(action.user);
    return newState;
  }),
  on(createUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
    isSuccessful: false,
  }))
);

export const getUserReducer = createReducer(
  initialState,
  on(getUser, (state) => ({ ...state, loading: true })),
  on(getUserSuccess, (state, action) => {
    console.log(action);
    let newState = {
      ...state,
      user: action.user,
      loading: false,
      isSuccessful: true,
    };
    console.log(action.user);
    return newState;
  }),
  on(getUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
    isSuccessful: false,
  }))
);
