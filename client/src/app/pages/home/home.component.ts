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

  sideMenu = [
    {
      // id: 0,
      title: 'Home',
      icon: 'home',
      link: '/main'
    },
    {
      // id: 1,
      title: 'Share',
      icon: 'share',
      link: '/shared'
    },
    {
      // id: 2,
      title: 'Save',
      icon: 'save',
      link: '/saved'
    },
  ]
  sideBarSelected: number = 0;
  user: any;
  constructor(
    public authService: AuthService,
    public userSerivce: UserService,
    public router: Router,
    private store: Store<{ auth: AuthState }>
  ) {
    this.auth$ = store.select('auth');
    this.user = history.state.data;
    this.router.navigate(['/paper'], { state: { data: this.user } });
  }

  logOut() {
    this.store.dispatch({ type: '[Auth] Logout' });
  }

  ngOnInit() {}

  select(index: number) {
    this.sideBarSelected = index;
    this.router.navigate(["/home"+this.sideMenu[index].link]);
  }
}
