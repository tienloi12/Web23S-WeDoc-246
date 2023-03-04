import { IdTokenResult } from '@angular/fire/auth';

export interface UserModel {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
