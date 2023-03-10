import { FileModel } from 'src/app/models/file.model';

export interface FileState {
  fileId: FileModel | null;
  loading: boolean;
  error: string | null;
  isSuccessful: boolean;
}

import { DocumentFile } from 'src/app/models/file.model';

export interface GetFilesState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string;
  files: DocumentFile[];
}
