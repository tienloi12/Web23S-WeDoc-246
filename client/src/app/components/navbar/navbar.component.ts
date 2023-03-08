import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ColabDialogComponent } from '../colab-dialog/colab-dialog.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

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

  openDialog() {
    this.dialog.open(ColabDialogComponent);
  }
}
