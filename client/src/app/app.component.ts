import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private auth: Auth, private authService: AuthService, private router: Router) {}
  title = 'client';

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.authService.currentUser = user;
        this.authService.userName = user.displayName;
        this.authService.photoUrl = user.photoURL;
        console.log(this.authService.currentUser);
      } else {
        this.authService.currentUser = null;
        console.log(this.authService.currentUser);
        this.router.navigate(['/landing']);
      }
    });
  }
}
