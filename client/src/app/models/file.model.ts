import { UserModel } from './user.model';

// export interface FileModel {
//   fileId: string;
//   uidMain: string;
//   content: string;
//   users: UserModel[];
// }

export interface DocumentFile {
  fileId: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  collaborators: UserModel[];
  createdAt: string;
  updatedAt: string;
}
