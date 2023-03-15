import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { UserModel } from 'src/app/models/user.model';
import {
  CreateFileState,
  GetFileDetailState,
} from 'src/app/ngrx/states/file.state';
import { UserState } from 'src/app/ngrx/states/user.state';
import * as UserActions from '../../ngrx/actions/user.action';
import * as FileActions from '../../ngrx/actions/file.action';
import { DocumentFile } from 'src/app/models/file.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.scss'],
})
export class InviteDialogComponent {
  emailControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    public dialogRef: MatDialogRef<InviteDialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<{ user: UserState }>
  ) {
    // console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  invite() {
    this.dialogRef.close(this.emailControl.value);
  }

  close() {
    this.dialogRef.close();
  }
}
