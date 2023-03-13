import { DocumentFile } from 'src/app/models/file.model';

export interface CreateFileState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string;
  file: DocumentFile;
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
}
