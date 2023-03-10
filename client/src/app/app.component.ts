import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private auth: Auth,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}
  title = 'client';
  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.authService.currentUser = user;
        this.authService.userName = user.displayName;
        this.authService.photoUrl = user.photoURL;

        this.userService.user$ = this.userService.getProfile(
          this.authService.currentUser?.uid || ''
        );
      } else {
        this.authService.currentUser = null;
        this.router.navigate(['/landing']);
      }
    });
  }
}
