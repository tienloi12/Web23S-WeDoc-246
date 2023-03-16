import { DocumentFile } from 'src/app/models/file.model';

export interface CreateFileState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string;
  file: DocumentFile;
}

export interface DeleteFileState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string;
  msg: string;
}

export interface GetFileDetailState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string;
  file: DocumentFile;
}

export interface GetFilesState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string;
  files: DocumentFile[];
  sharedFiles: DocumentFile[];
}

export interface InviteCollaboratorState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string;
  file: DocumentFile;
}
