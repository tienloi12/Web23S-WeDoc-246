import { createAction, props } from '@ngrx/store';
import { DocumentFile } from 'src/app/models/file.model';

export const createFile = createAction(
  '[File] Create File',
  props<{ file: DocumentFile }>()
);

export const createFileSuccess = createAction(
  '[File] Create File Success',
  props<{ file: DocumentFile }>()
);

export const createFileFailure = createAction(
  '[File] Create File Failure',
  props<{ error: string }>()
);

export const getFile = createAction(
  '[File] Get File',
  props<{ fileId: string }>()
);
export const getFileSuccess = createAction(
  '[File] Get File Success',
  props<{ file: DocumentFile }>()
);
export const getFileFailure = createAction(
  '[File] Get File Failure',
  props<{ error: string }>()
);

// GET FILES
export const getFiles = createAction('[File] Get Files');

export const getFilesSuccess = createAction(
  '[File] Get Files Success',
  props<{ files: DocumentFile[] }>()
);

export const getFilesFailure = createAction(
  '[File] Get Files Failure',
  props<{ error: string }>()
);
