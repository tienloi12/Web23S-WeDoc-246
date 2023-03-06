import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  currentUser!: User | null;
  userName!: string | null;
  photoUrl!: string | null;

  loginWithGoogle() {
    console.log('loginWithGoogle');
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
