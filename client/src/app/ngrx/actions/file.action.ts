import { createAction, props } from '@ngrx/store';
import { FileModel } from 'src/app/models/file.model';

export const createFile = createAction(
  '[File] Create File',
  props<{ file: FileModel }>()
);
export const createFileSuccess = createAction(
  '[File] Create File Success',
  props<{ file: FileModel }>()
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
  props<{ file: FileModel }>()
);
export const getFileFailure = createAction(
  '[File] Get File Failure',
  props<{ error: string }>()
);

