import { createReducer, on } from '@ngrx/store';
import { CreateFileState, GetFileDetailState } from '../states/file.state';
import * as FileActions from '../actions/file.action';
import { GetFilesState } from '../states/file.state';
import { DocumentFile } from 'src/app/models/file.model';

export const initialState: CreateFileState = {
  isLoading: false,
  isSuccess: false,
  error: '',
  file: <DocumentFile>{},
};

export const createFileReducer = createReducer(
  initialState,
  on(FileActions.createFile, (state) => {
    console.log(state.file);
    let newState = {
      ...state,
      loading: true,
    };
    console.log(newState);
    return newState;
  }),

  on(FileActions.createFileSuccess, (state, action) => {
    console.log(action);
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

export const initialGetFileState: GetFileDetailState = {
  isLoading: false,
  isSuccess: false,
  error: '',
  file: <DocumentFile>{},
};

export const getFileReducer = createReducer(
  initialState,
  on(FileActions.getFileDetail, (state) => ({ ...state, loading: true })),

  on(FileActions.getFileDetailSuccess, (state, action: any) => {
    let newState = {
      ...state,
      file: action.file,
      loading: false,
      isSuccess: true,
    };
    return newState;
  }),

  on(FileActions.getFileDetailFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
    isSuccess: false,
  }))
);

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
  }),

  // Get files by author id
  on(FileActions.getFilesByAuthorId, (state) => {
    return {
      ...state,
      isLoading: true,
      isSuccess: false,
      error: '',
    };
  }),

  on(FileActions.getFilesByAuthorIdSuccess, (state, action) => {
    console.log(action);

    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      error: '',
      files: action.files,
    };
  }),

  on(FileActions.getFilesByAuthorIdFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      isSuccess: false,
      error: error,
    };
  })
);

// export const fileReducers = createReducer(
//   initialState,
//   on(FileActions.createFile, (state) => ({ ...state, loading: true })),

//   on(FileActions.createFileSuccess, (state, action) => {
//     console.log(action.file);
//     let newState = {
//       ...state,
//       fileId: action.file,
//       loading: false,
//       isSuccessful: true,
//     };
//     console.log(newState);
//     return newState;
//   }),

//   on(FileActions.createFileFailure, (state, { error }) => ({
//     ...state,
//     error: error,
//     loading: false,
//     isSuccessful: false,
//   }))
// );
