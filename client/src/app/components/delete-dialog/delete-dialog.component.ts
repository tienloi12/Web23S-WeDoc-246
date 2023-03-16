import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { DeleteFileState } from 'src/app/ngrx/states/file.state';
import * as FileActions from 'src/app/ngrx/actions/file.action';
import { HomeMainComponent } from 'src/app/pages/home/components/home-main/home-main.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    private store: Store<{ deleteFile: DeleteFileState }>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirm() {
    this.store.dispatch(FileActions.deteleFile({ fileId: this.data.fileId }));
    window.location.reload();
  }
}
