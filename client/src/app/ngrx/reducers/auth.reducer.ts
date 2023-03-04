import { createReducer, on } from "@ngrx/store";
import { login, loginFailure, loginSuccess, logout, logoutFailure, logoutSuccess } from "../actions/auth.action";
import { AuthState } from '../states/auth.state';



export const initialState: AuthState = {
  user: null,
  loading: false,
  error: '',
  isSuccessful: false,
};

export const authReducer = createReducer( initialState,
        on(login, (state) => ({ ...state, loading: true })),
        on(loginSuccess, (state, { user }) => {
                let newState = {
                        ...state,
                        user: user,
                        loading: false,
                        isSuccessful: true
                };
                console.log(newState);
                return newState;
        }),
        // on(loginSuccess, (state, { user }) => ({ ...state, user: user, loading: false, isSuccessful: true })),
        on(loginFailure, (state, { error }) => ({ ...state, error: error, loading: false, isSuccessful: false })),
        on(logout, (state) => ({ ...state, loading: true })),
        on(logoutSuccess, (state) => ({ ...state, user: null, loading: false, isSuccessful: true })),
        on(logoutFailure, (state, { error }) => ({ ...state, error: error, loading: false, isSuccessful: false })),
);