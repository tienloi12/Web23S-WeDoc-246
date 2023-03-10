import { createReducer, on } from '@ngrx/store';
import * as FileActions from '../actions/file.action';
import { GetFilesState } from '../states/file.state';

export const initialGetFilesState: GetFilesState = {
  isLoading: false,
  isSuccess: false,
  error: '',
  files: [],
};

export const getFilesReducer = createReducer(
  initialGetFilesState,
  on(FileActions.getFiles, (state) => {
    return {
      ...state,
      isLoading: true,
      isSuccess: false,
      error: '',
    };
  }),

  on(FileActions.getFilesSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      error: '',
      files: action.files,
    };
  }),

  on(FileActions.getFilesFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      isSuccess: false,
      error: error,
    };
  })
);
