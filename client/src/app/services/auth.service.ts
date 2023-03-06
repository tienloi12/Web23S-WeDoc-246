import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { AuthState } from '../ngrx/states/auth.state';
import * as CreateUser from '../ngrx/actions/createuser.action';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getUser$!: Observable<AuthState>;
  constructor(
    private auth: Auth,
    private router: Router,
    private store: Store<{ auth: AuthState }>
  ) {
    this.getUser$ = store.select('auth');
  }

  currentUser!: UserModel | null;
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
            uid: userCredential.user?.uid,
            email: userCredential.user?.email,
            displayName: userCredential.user?.displayName,
            photoURL: userCredential.user?.photoURL,
          };
          this.store.dispatch(CreateUser.getUser({ id: user.uid }));
          // this.store.dispatch(CreateUser.createUser({ user: user }));
          console.log(user);

          this.router.navigate(['/home']);
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

  checkUser() {
    if (this.currentUser) {
      return true;
    }
    return false;
  }
}
