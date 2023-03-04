import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.scss'],
})
export class PaperComponent {
  showSideBar = false;

  auth$: Observable<AuthState>;
  constructor(public authService: AuthService, private store: Store<{auth: AuthState}>) {
    this.auth$ = store.select('auth');
  }
}
