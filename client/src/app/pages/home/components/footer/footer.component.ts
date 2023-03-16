import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { UserState } from 'src/app/ngrx/states/user.state';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  auth$: Observable<AuthState>;
  user$ = this.store.select('user', 'user');
  constructor(
    public authService: AuthService,
    public userSerivce: UserService,
    public router: Router,
    private store: Store<{ auth: AuthState; user: UserState }>
  ) {
    this.auth$ = store.select('auth');
  }
  newPaper() {
    this.router.navigate(['/paper']);
  }

  logOut() {
    this.store.dispatch({ type: '[Auth] Logout' });
  }
}
