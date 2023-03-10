import { UserModel } from './user.model';

export interface FileModel {
  fileId: string | null;
  uidMain: string | null;
  content: string | null;
  users: UserModel[] | null;
}
export interface DocumentFile {
  _id: string;
  authorId: string;
  content: string;
  collaborators: UserModel[];
  createdAt: string;
}
