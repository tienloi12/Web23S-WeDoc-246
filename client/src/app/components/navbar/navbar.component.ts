import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ColabDialogComponent } from '../colab-dialog/colab-dialog.component';
import { FileService } from 'src/app/services/file.service';
import { Observable, Subscription } from 'rxjs';
import { CreateFileState } from 'src/app/ngrx/states/file.state';
import { Store } from '@ngrx/store';
import * as FileActions from 'src/app/ngrx/actions/file.action';
import { UserState } from 'src/app/ngrx/states/user.state';
import { UserModel } from 'src/app/models/user.model';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user$ = this.store.select('user', 'user');
  user: UserModel = <UserModel>{};
  userSubcription!: Subscription;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fileService: FileService,
    private store: Store<{ file: CreateFileState; user: UserState }>
  ) {}
  ngOnDestroy(): void {
    this.userSubcription.unsubscribe();
  }
  ngOnInit(): void {
    this.userSubcription = this.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  @Input()
  sidebarOpen = false;

  @Output()
  sidebarOpenChange = new EventEmitter<boolean>();

  backHome() {
    this.router.navigate(['/home/main']);
  }

  openDialog() {
    this.dialog.open(ColabDialogComponent);
  }

  save() {
    this.fileService.save(this.user);
  }
}
