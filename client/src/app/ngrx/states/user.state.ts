import { UserModel } from 'src/app/models/user.model';

export interface UserState {
  loading: boolean;
  error: string | null;
  isSuccessful: boolean;
  user: UserModel;
}
