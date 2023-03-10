import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { AuthService } from 'src/app/services/auth.service';
import * as AuthActions from '../../ngrx/actions/auth.action';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  login$: Observable<AuthState>;
  constructor(
    public authService: AuthService,
    public router: Router,
    private store: Store<{ auth: AuthState }>
  ) {
    this.login$ = store.select('auth');
  }

  loginWithGoogle() {
    this.store.dispatch(AuthActions.login());
  }

  goToIntroduce() {
    this.router.navigate(['/introduce']);
  }
}
