import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { from } from 'rxjs';
import { UserModel } from '../models/user.model';
import * as UserActions from '../ngrx/actions/user.action';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private store: Store
  ) {
  }

  loginWithGoogle() {
    return from(
      new Promise(async (resolve, reject) => {
        try {
          let userCredential = await signInWithPopup(
            this.auth,
            new GoogleAuthProvider()
          );
          let user!: UserModel;
          user = {
            _id: '',
            uid: userCredential.user?.uid,
            email: userCredential.user?.email || '',
            displayName: userCredential.user?.displayName || '',
            photoURL: userCredential.user?.photoURL || '',
          };
          this.store.dispatch(UserActions.createUser({ user: user }));
          resolve(user);
        } catch (error) {
          reject(error);
        }
      })
    );
  }

  async logOut() {
    return from(
      new Promise(async (resolve, reject) => {
        try {
          await signOut(this.auth);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      })
    );
  }
}
