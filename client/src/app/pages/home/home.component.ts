import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  auth$: Observable<AuthState>;

  constructor(
    public authService: AuthService,
    public userSerivce: UserService,
    public router: Router,
    private store: Store<{ auth: AuthState }>
  ) {
    this.auth$ = store.select('auth');
  }

  logOut() {
    this.store.dispatch({ type: '[Auth] Logout' });
  }

  ngOnInit() {
  }
}
