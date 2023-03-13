import { DocumentFile } from 'src/app/models/file.model';

export interface CreateFileState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string;
  file: DocumentFile[];
}


export interface UpdateFileState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string;
  file: DocumentFile[];
}

export interface GetFileState {
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
}
