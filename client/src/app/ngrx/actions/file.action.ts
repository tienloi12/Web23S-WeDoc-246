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

// GET FILE DETAIL
export const getFileDetail = createAction(
  '[File] Get  File Detail',
  props<{ fileId: string }>()
);
export const getFileDetailSuccess = createAction(
  '[File] Get File Detail Success',
  props<{ file: DocumentFile }>()
);
export const getFileDetailFailure = createAction(
  '[File] Get File Detail Failure',
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

// GET FILES BY AUTHOR ID
export const getFilesByAuthorId = createAction(
  '[File] Get Files By Author Id',
  props<{ authorId: string }>()
);

export const getFilesByAuthorIdSuccess = createAction(
  '[File] Get Files By Author Id Success',
  props<{ files: DocumentFile[] }>()
);

export const getFilesByAuthorIdFailure = createAction(
  '[File] Get Files By Author Id Failure',
  props<{ error: string }>()
);

// UPDATE FILE
export const updateFile = createAction(
  '[File] Update File',
  props<{ fileId: string; file: DocumentFile }>()
);

export const updateFileSuccess = createAction(
  '[File] Update File Success',
  props<{ file: DocumentFile }>()
);

export const updateFileFailure = createAction(
  '[File] Update File Failure',
  props<{ error: string }>()
);

// Delete
export const deteleFile = createAction(
  '[File] Delete File',
  props<{ fileId: string }>()
);

export const deteleFileSuccess = createAction(
  '[File] Delete File Success',
  props<{ msg: string }>()
);

export const deteleFileFailure = createAction(
  '[File] Delete File Failure',
  props<{ error: string }>()
);

// INVITE COLLABORATOR
export const inviteCollaborator = createAction(
  '[File] Invite Collaborator',
  props<{ file: DocumentFile; uid: string }>()
);

export const inviteCollaboratorSuccess = createAction(
  '[File] Invite Collaborator Success'
);

export const inviteCollaboratorFailure = createAction(
  '[File] Invite Collaborator Failure',
  props<{ error: string }>()
);
