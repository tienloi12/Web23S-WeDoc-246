import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { AuthState } from '../ngrx/states/auth.state';
import * as UserActions from '../ngrx/actions/user.action';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private router: Router,
    private store: Store
  ) {
    // onAuthStateChanged(this.auth, (user: UserModel | null) => {
    //   if (user) {
    //     this.currentUser = {
    //       uid: user.uid,
    //       email: user.email,
    //       displayName: user.displayName,
    //       photoURL: user.photoURL,
    //     };
    //     this.userName = user.displayName;
    //     this.photoUrl = user.photoURL;
    //     console.log(this.currentUser);
    //     this.store.dispatch(CreateUser.getUser({ id: user.uid }));
    //   } else {
    //     this.currentUser = null;
    //     this.userName = null;
    //     this.photoUrl = null;
    //   }
    // });
  }

  userId!: string;
  currentUser!: UserModel;
  userName!: string | null;
  photoUrl!: string | null;

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
            // documentFiles: [],
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
