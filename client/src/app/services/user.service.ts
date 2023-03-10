import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$!: Observable<UserModel>;
  constructor(private httpCLient: HttpClient) {}

  post(user: UserModel) {
    return this.httpCLient.post('http://localhost:3000/v1/user/create', user);
  }

  getProfile(uid: string) {
    return this.httpCLient.get<UserModel>(
      `http://localhost:3000/v1/user/info/${uid}`
    );
  }

  getProfileByEmail(email: string | null) {
    return this.httpCLient.get<UserModel>(
      `http://localhost:3000/v1/user/${email}`
    );
  }
}
