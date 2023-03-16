import { createReducer, on } from '@ngrx/store';
import {
  CreateFileState,
  DeleteFileState,
  GetFileDetailState,
} from '../states/file.state';
import * as FileActions from '../actions/file.action';
import { GetFilesState } from '../states/file.state';
import { DocumentFile } from 'src/app/models/file.model';

export const initialState: CreateFileState = {
  isLoading: false,
  isInviteSuccess: false,
  isCreateSuccess: false,
  isUpdateSuccess: false,
  error: '',
  data: {
    file: <DocumentFile>{},
    msg: '',
  },
};

export const createFileReducer = createReducer(
  initialState,
  on(FileActions.createFile, (state) => {
    let newState = {
      ...state,
      loading: true,
    };
    return newState;
  }),

  on(FileActions.createFileSuccess, (state, action) => {
    let newState = {
      ...state,
      data: {
        file: action.file,
        msg: action.msg,
      },
      loading: false,
      isCreateSuccess: true,
    };
    return newState;
  }),

  on(FileActions.createFileFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
    isCreateSuccess: false,
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
  sharedFiles: [],
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
      files: [],
    };
  }),

  // Get files by collaborator id
  on(FileActions.getFilesByCollaboratorId, (state) => {
    return {
      ...state,
      isLoading: true,
      isSuccess: false,
      error: '',
    };
  }),

  on(FileActions.getFilesByCollaboratorIdSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      error: '',
      sharedFiles: action.files,
    };
  }),

  on(FileActions.getFilesByCollaboratorIdFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      isSuccess: false,
      error: error,
      sharedFiles: [],
    };
  })
);

export const fileReducers = createReducer(
  initialState,
  on(FileActions.updateFile, (state, { type }) => {
    console.log(type);
    return { ...state, isLoading: true, isUpdateSuccess: false };
  }),

  on(FileActions.updateFileSuccess, (state, action) => {
    console.log(action.type);
    let newState = {
      ...state,
      fileId: action.file,
      isLoading: false,
      isUpdateSuccess: true,
    };
    return newState;
  }),

  on(FileActions.updateFileFailure, (state, { error }) => ({
    ...state,
    error: error,
    isLoading: false,
    isUpdateSuccess: false,
  })),

  on(FileActions.inviteCollaborator, (state, { type }) => {
    console.log(type);
    return { ...state, isLoading: true };
  }),

  on(FileActions.inviteCollaboratorSuccess, (state, { type }) => {
    console.log(type);
    let newState = {
      ...state,
      isLoading: false,
      isInviteSuccess: true,
    };
    return newState;
  }),

  on(FileActions.inviteCollaboratorFailure, (state, { type, error }) => {
    console.log(type, error);
    return {
      ...state,
      error: error,
      loading: false,
      isInviteSuccess: false,
    };
  })
);

export const initialDeleteState: DeleteFileState = {
  isLoading: false,
  isSuccess: false,
  error: '',
  msg: '',
};

export const deleteFileReducer = createReducer(
  initialState,
  on(FileActions.deteleFile, (state) => {
    let newState = {
      ...state,
      loading: true,
    };
    return newState;
  }),

  on(FileActions.deteleFileSuccess, (state, action) => {
    let newState = {
      ...state,
      msg: action.msg,
      loading: false,
      isSuccessful: true,
    };
    return newState;
  }),

  on(FileActions.deteleFileFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
    isSuccessful: false,
  }))
);
