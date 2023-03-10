import { createReducer, on } from '@ngrx/store';
import { CreateFileState } from '../states/file.state';
import * as FileActions from '../actions/file.action';
import { GetFilesState } from '../states/file.state';

export const initialState: CreateFileState = {
  isLoading: false,
  isSuccess: false,
  error: '',
  file: [],
};

export const createFileReducer = createReducer(
  initialState,
  on(FileActions.createFile, (state) => ({ ...state, loading: true })),
  on(FileActions.createFileSuccess, (state, action) => {
    let newState = {
      ...state,
      fileId: action.file,
      loading: false,
      isSuccessful: true,
    };
    return newState;
  }),
  on(FileActions.createFileFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
    isSuccessful: false,
  }))
);

// export const getFileReducer = createReducer(
//   initialState,
//   on(FileActions.getFile, (state) => ({ ...state, loading: true })),
//   on(FileActions.getFileSuccess, (state, action) => {
//     let newState = {
//       ...state,
//       fileId: action.file,
//       loading: false,
//       isSuccessful: true,
//     };
//     return newState;
//   }),
//   on(FileActions.getFileFailure, (state, { error }) => ({
//     ...state,
//     error: error,
//     loading: false,
//     isSuccessful: false,
//   }))
// );

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
