import { DocumentFile } from './file.model';

export interface UserModel {
  _id: string;
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  // documentFiles: DocumentFile[];
}
