import { User } from '@angular/fire/auth';
import { UserModel } from 'src/app/models/user.model';

export interface AuthState {
  user: UserModel;
  loading: boolean;
  error: string | null;
  isSuccessful: boolean;
}
