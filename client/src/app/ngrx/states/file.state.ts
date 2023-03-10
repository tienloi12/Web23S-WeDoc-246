import { DocumentFile } from 'src/app/models/file.model';

export interface GetFilesState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string;
  files: DocumentFile[];
}
