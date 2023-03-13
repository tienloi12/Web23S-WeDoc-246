import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {
  Validators,
  Editor,
  Toolbar,
  DEFAULT_TOOLBAR,
  toHTML,
  toDoc,
} from 'ngx-editor';
import jsonDoc from './doc';
import schema from './schema';
import nodeViews from '../../nodeviews';
import { FileService } from 'src/app/services/file.service';
// import { FileState } from 'src/app/ngrx/states/file.state';
import * as FileActions from 'src/app/ngrx/actions/file.action';
import { UserState } from 'src/app/ngrx/states/user.state';
import { UserModel } from 'src/app/models/user.model';
import { GetFileState } from 'src/app/ngrx/states/file.state';
import { DocumentFile } from 'src/app/models/file.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PaperComponent implements OnInit, OnDestroy {
  showSideBar = false;
  // user$ = this.store.select('user', 'user');

  file$ = this.fileStore.select('getFile');

  // file$: Observable<FileState>;
  editordoc = jsonDoc;
  content!: string | null | undefined;
  constructor(
    public authService: AuthService,
    public fileService: FileService,
    private fileStore: Store<{ getFile: GetFileState }>,
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
    // console.log(this.form.get('editorContent'));
    return this.form.get('editorContent') ?? new FormControl();
  }

  ngOnInit(): void {
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
      FileActions.getFile({ fileId: this.activedRoute.snapshot.params['id'] })
    );
    this.file$.subscribe((file) => {
      if (file) {
        this.editor.setContent(toDoc(file.file.content));
      }
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
