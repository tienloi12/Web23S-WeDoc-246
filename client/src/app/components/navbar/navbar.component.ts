import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  @Input()
  sidebarOpen = false;

  @Output()
  sidebarOpenChange = new EventEmitter<boolean>();

  onclick() {
    this.sidebarOpenChange.emit(!this.sidebarOpen);
  }

  backHome() {
    this.router.navigate(['/home']);
  }
}
