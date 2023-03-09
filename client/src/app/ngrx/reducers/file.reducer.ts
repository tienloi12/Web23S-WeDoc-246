import { createReducer, on } from '@ngrx/store';
import {
  createFile,
  createFileFailure,
  createFileSuccess,
  getFile,
  getFileFailure,
  getFileSuccess,
} from '../actions/file.action';
import { FileState } from '../states/file.state';

export const initialState: FileState = {
  fileId: null,
  loading: false,
  error: '',
  isSuccessful: false,
};

export const createFileReducer = createReducer(
  initialState,
  on(createFile, (state) => ({ ...state, loading: true })),
  on(createFileSuccess, (state, action) => {
    let newState = {
      ...state,
      fileId: action.file,
      loading: false,
      isSuccessful: true,
    };
    return newState;
  }),
  on(createFileFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
    isSuccessful: false,
  }))
);

export const getFileReducer = createReducer(
  initialState,
  on(getFile, (state) => ({ ...state, loading: true })),
  on(getFileSuccess, (state, action) => {
    let newState = {
      ...state,
      fileId: action.file,
      loading: false,
      isSuccessful: true,
    };
    return newState;
  }
  ),
  on(getFileFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
    isSuccessful: false,
  }))
);

