import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user, User } from '@angular/fire/auth';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpCLient: HttpClient) {}

  post(user: UserModel) {
    console.log(user);
    return this.httpCLient.post('http://localhost:3000/user', user);
  }

  get(uid: string) {
    console.log(uid);
    return this.httpCLient.get(`http://localhost:3000/user?id=${uid}`);
  }
}
