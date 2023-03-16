import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {
  Validators,
  Editor,
  Toolbar,
  DEFAULT_TOOLBAR,
  toDoc,
} from 'ngx-editor';
import schema from './schema';
import nodeViews from '../../nodeviews';
import { FileService } from 'src/app/services/file.service';
import * as FileActions from 'src/app/ngrx/actions/file.action';
import {
  CreateFileState,
  GetFileDetailState,
} from 'src/app/ngrx/states/file.state';
import { ActivatedRoute } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class PaperComponent implements OnInit, OnDestroy {
  file$ = this.fileStore.select('getFile');
  editordoc = '';

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isCreateSuccessSubscription!: Subscription;
  isUpdateSuccessSubscription!: Subscription;
  isCreateSuccess$ = this.fileStore.select('createFile', 'isCreateSuccess');
  isUpdateSuccess$ = this.fileStore.select('file', 'isUpdateSuccess');

  constructor(
    private _snackBar: MatSnackBar,
    public authService: AuthService,
    public fileService: FileService,
    private fileStore: Store<{
      getFile: GetFileDetailState;
      createFile: CreateFileState;
      file: CreateFileState;
    }>,
    private activedRoute: ActivatedRoute
  ) {}

  isProdMode = environment.production;

  editor: Editor = new Editor();
  toolbar: Toolbar = DEFAULT_TOOLBAR;

  form = new FormGroup({
    editorContent: new FormControl(
      { value: '', disabled: false },
      Validators.required(schema)
    ),
  });

  get doc(): AbstractControl {
    return this.form.get('editorContent') ?? new FormControl();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['snackbar'],
    });
  }

  ngOnInit(): void {
    let input = document.querySelector('.NgxEditor__MenuBar');
    input?.classList.add('background-color');
    this.editor = new Editor({
      schema,
      nodeViews,
      history: true,
      keyboardShortcuts: true,
      inputRules: true,
      attributes: { enterkeyhint: 'enter' },
      features: {
        linkOnPaste: true,
        resizeImage: true,
      },
    });
    this.fileStore.dispatch(
      FileActions.getFileDetail({
        fileId: this.activedRoute.snapshot.params['id'],
      })
    );

    this.file$.subscribe((file) => {
      if (file) {
        this.editor.setContent(toDoc(file.file.content));
        let title = document.querySelector('#title') as HTMLInputElement;
        title.value = file.file.title;
      }
    });

    this.isCreateSuccessSubscription = this.isCreateSuccess$.subscribe(
      (isCreateSuccess) => {
        if (isCreateSuccess) {
          this.openSnackBar('Create file success');
          this.fileStore.dispatch(
            FileActions.getFileDetail({
              fileId: this.activedRoute.snapshot.params['id'],
            })
          );
        }
      }
    );

    this.isUpdateSuccessSubscription = this.isUpdateSuccess$.subscribe(
      (isUpdateSuccess) => {
        if (isUpdateSuccess) {
          this.openSnackBar('Update file success');
          this.fileStore.dispatch(
            FileActions.getFileDetail({
              fileId: this.activedRoute.snapshot.params['id'],
            })
          );
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    this.isCreateSuccessSubscription.unsubscribe();
    this.isUpdateSuccessSubscription.unsubscribe();
  }
}
