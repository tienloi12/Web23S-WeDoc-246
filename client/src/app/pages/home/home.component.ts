import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { UserState } from 'src/app/ngrx/states/user.state';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  auth$: Observable<AuthState>;

  sideMenu = [
    {
      title: 'Home',
      icon: 'home',
      link: '/main',
    },
    {
      title: 'Share',
      icon: 'share',
      link: '/shared',
    },
    {
      title: 'Save',
      icon: 'save',
      link: '/saved',
    },
  ];
  sideBarSelected: number = 0;
  user$ = this.store.select('user', 'user');
  constructor(
    public authService: AuthService,
    public userSerivce: UserService,
    public router: Router,
    private store: Store<{ auth: AuthState; user: UserState }>
  ) {
    this.auth$ = store.select('auth');
    // this.user = history.state.data;
    // this.router.navigate(['/paper'], { state: { data: this.user } });
  }

  logOut() {
    this.store.dispatch({ type: '[Auth] Logout' });
  }

  ngOnInit() {}

  select(index: number) {
    this.sideBarSelected = index;
    this.router.navigate(['/home' + this.sideMenu[index].link]);
  }
}
