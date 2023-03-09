import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ColabDialogComponent } from '../colab-dialog/colab-dialog.component';
import { FileService } from 'src/app/services/file.service';
import { Observable } from 'rxjs';
import { FileState } from 'src/app/ngrx/states/file.state';
import { Store } from '@ngrx/store';
import * as FileActions from 'src/app/ngrx/actions/file.action';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fileService: FileService
  ) {}

  @Input()
  sidebarOpen = false;

  @Output()
  sidebarOpenChange = new EventEmitter<boolean>();

  onclick() {
    this.sidebarOpenChange.emit(!this.sidebarOpen);
  }

  backHome() {
    this.router.navigate(['/home/main']);
  }

  openDialog() {
    this.dialog.open(ColabDialogComponent);
  }

  save() {
    this.fileService.save(history.state.data);
  }
}
