import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$!: Observable<UserModel>;
  constructor(private httpCLient: HttpClient) {}

  post(user: UserModel) {
    return this.httpCLient.post(environment.URL + '/v1/user/create', user);
  }

  getProfile(uid: string) {
    return this.httpCLient.get<UserModel>(
      environment.URL + `/v1/user/info/${uid}`
    );
  }

  getProfileByEmail(email: string) {
    return this.httpCLient.get<UserModel>(
      environment.URL + `/v1/user/${email}`
    );
  }
}
