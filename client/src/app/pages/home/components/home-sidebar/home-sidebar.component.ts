import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.scss']
})
export class HomeSidebarComponent implements OnInit{

  sideMenu = [
    {
      // id: 0,
      title: 'Home',
      icon: 'home',
      
    },
    {
      // id: 1,
      title: 'Share',
      icon: 'share',
    },
    {
      // id: 2,
      title: 'Save',
      icon: 'save',
    },
  ]
  sideBarSelected: number = 0;
  auth$: Observable<AuthState>;
  constructor(
    public authService: AuthService,
    public router: Router,
    private store: Store<{ auth: AuthState }>
  ) {
    this.auth$ = store.select('auth');
  }
  ngOnInit(): void {
    
  }
  select(index: number) {
    this.sideBarSelected = index;
  }

  logOut() {
    this.store.dispatch({ type: '[Auth] Logout' });
  }
}
