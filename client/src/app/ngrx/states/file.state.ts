import { FileModel } from "src/app/models/file.model";

export interface FileState {
  fileId: FileModel | null;
  loading: boolean;
  error: string | null;
  isSuccessful: boolean;
}
