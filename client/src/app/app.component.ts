import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import * as UserActions from './ngrx/actions/user.action';
import { Store } from '@ngrx/store';
import { UserState } from './ngrx/states/user.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private auth: Auth,

    private router: Router,
    private store: Store<{ user: UserState }>
  ) {}
  title = 'client';

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.store.dispatch(UserActions.getUserById({ id: user.uid }));
        this.router.navigate(['/home/main']);
      } else {
        this.store.dispatch(UserActions.clearUser());
        this.router.navigate(['/landing']);
      }
    });
  }
}
