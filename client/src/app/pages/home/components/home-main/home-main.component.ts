import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CreateFileState,
  DeleteFileState,
  GetFilesState,
} from 'src/app/ngrx/states/file.state';
import * as FileActions from 'src/app/ngrx/actions/file.action';
import { Observable, Subscription } from 'rxjs';
import { DocumentFile } from 'src/app/models/file.model';
import { Router } from '@angular/router';
import { UserState } from 'src/app/ngrx/states/user.state';
import { UserModel } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';
import { InviteDialogComponent } from 'src/app/components/invite-dialog/invite-dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class HomeMainComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isSuccessSubscription!: Subscription;
  isSuccess$ = this.store.select('file', 'isSuccess');
  errorSubscription!: Subscription;
  error$ = this.store.select('file', 'error');
  files$: Observable<DocumentFile[]>;
  user$: Observable<UserModel>;

  user!: UserModel;

  constructor(
    private _snackBar: MatSnackBar,
    private store: Store<{
      getFiles: GetFilesState;
      getByAuthorId: GetFilesState;
      user: UserState;
      deleteFile: DeleteFileState;
      file: CreateFileState;
    }>,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.user$ = store.select('user', 'user');
    store.select('deleteFile');
    this.store.select('user', 'user').subscribe((data) => {
      if (data) {
        if (data._id === undefined) return;
        console.log(data);
        this.user = data;
        store.dispatch(FileActions.getFilesByAuthorId({ authorId: data._id }));
      }
    });

    this.files$ = store.select('getFiles', 'files');
  }
  ngOnDestroy(): void {
    this.isSuccessSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.isSuccessSubscription = this.isSuccess$.subscribe((data) => {
      if (data) {
        this.openSnackBar('Invite Successfully!!!');
        this.store.dispatch(
          FileActions.getFilesByAuthorId({ authorId: this.user._id })
        );
      }
    });
    this.errorSubscription = this.error$.subscribe((data) => {
      if (data == 'User not found') {
        this.openSnackBar(data);
      } else if (data == 'User is already a collaborator') {
        this.openSnackBar(data);
      }
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['snackbar'],
    });
  }

  newPaper() {
    this.router.navigate(['/paper']);
  }

  openFile($event: any) {
    this.router.navigate(['/paper/' + $event]);
  }

  openDialogDelete(fileId: string) {
    this.dialog.open(DeleteDialogComponent, { data: fileId });
  }
  openDialog() {
    const dialogRef = this.dialog.open(InviteDialogComponent);
  }

  opeInviteDialog(item: any) {
    
  }
}

