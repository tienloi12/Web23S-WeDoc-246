import { createAction, props } from '@ngrx/store';
import { DocumentFile } from '../../models/file.model';

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
