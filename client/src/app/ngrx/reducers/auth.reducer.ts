import { createReducer, on } from '@ngrx/store';
import { UserModel } from 'src/app/models/user.model';
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
} from '../actions/auth.action';
import { AuthState } from '../states/auth.state';

export const initialState: AuthState = {
  loading: false,
  error: '',
  isSuccessful: false,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    user: null,
    error: '',
    isSuccessful: false,
    loading: true,
  })),
  on(loginSuccess, (state, aciton) => {
    console.log(aciton.type);
    let newState = {
      ...state,
      error: '',
      loading: false,
      isSuccessful: true,
    };
    return newState;
  }),
  on(loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    error: error,
    loading: false,
    isSuccessful: false,
  })),
  on(logout, (state) => ({ ...state, loading: true })),
  on(logoutSuccess, (state) => ({
    ...state,
    user: <UserModel>{},
    loading: false,
    isSuccessful: true,
  })),
  on(logoutFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
    isSuccessful: false,
  }))
);
