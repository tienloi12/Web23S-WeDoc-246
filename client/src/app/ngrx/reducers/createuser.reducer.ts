import { createReducer, on } from '@ngrx/store';
import {
  createUser,
  createUserFailure,
  createUserSuccess,
  getAllUsers,
  getAllUsersFailure,
  getAllUsersSuccess,
  getUser,
  getUserFailure,
  getUserSuccess,
} from '../actions/createuser.action';
import { AllUser, AuthState } from '../states/auth.state';

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: '',
  isSuccessful: false,
};

export const initialAllState: AllUser = {
  users: [],
  loading: false,
  error: '',
  isSuccessful: false,
};


export const createUserReducer = createReducer(
  initialState,
  on(createUser, (state) => ({ ...state, loading: true })),
  on(createUserSuccess, (state, action) => {
    let newState = {
      ...state,
      user: action.user,
      loading: false,
      isSuccessful: true,
    };
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
    let newState = {
      ...state,
      user: action.user,
      loading: false,
      isSuccessful: true,
    };
    return newState;
  }),
  on(getUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
    isSuccessful: false,
  }))
);

export const getAllUsersReducer = createReducer(
  initialAllState,
  on(getAllUsers, (state) => ({ ...state, loading: true })),
  on(getAllUsersSuccess, (state, action) => {
    let newState = {
      ...state,
      user: action.users,
      loading: false,
      isSuccessful: true,
    };
    return newState;
  }),
  on(getAllUsersFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
    isSuccessful: false,
  }))
);
