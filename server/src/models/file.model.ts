import { UserModel } from "./user.model";

export interface FileModel {
  fileId: string | null;
  uidMain: string | null;
  content: string | null;
  users: UserModel[] | null;
}
