import { UserModel } from 'src/app/models/user.model';

export interface AuthState {
  user: UserModel | null;
  loading: boolean;
  error: string | null;
  isSuccessful: boolean;
}

