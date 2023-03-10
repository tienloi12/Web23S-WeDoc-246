import { UserModel } from './user.model';

export interface DocumentFile {
  _id: string;
  authorId: string;
  content: string;
  collaborators: UserModel[];
  createdAt: string;
}
