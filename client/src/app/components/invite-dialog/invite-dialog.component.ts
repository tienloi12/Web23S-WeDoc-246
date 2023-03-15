import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.scss'],
})
export class InviteDialogComponent {
  constructor(public dialogRef: MatDialogRef<InviteDialogComponent>) {}

  close() {
    this.dialogRef.close();
  }
}
