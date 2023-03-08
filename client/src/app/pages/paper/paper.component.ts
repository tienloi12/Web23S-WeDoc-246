import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { AuthService } from 'src/app/services/auth.service';

import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { Validators, Editor, Toolbar, DEFAULT_TOOLBAR } from 'ngx-editor';

import jsonDoc from './doc';
import schema from './schema';
import nodeViews from '../../nodeviews';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PaperComponent implements OnInit, OnDestroy {
  showSideBar = false;

  auth$: Observable<AuthState>;
  constructor(
    public authService: AuthService,
    private store: Store<{ auth: AuthState }>
  ) {
    this.auth$ = store.select('auth');
  }

  isProdMode = environment.production;

  editordoc = jsonDoc;

  editor: Editor = new Editor();
  toolbar: Toolbar = DEFAULT_TOOLBAR;

  form = new FormGroup({
    editorContent: new FormControl(
      { value: jsonDoc, disabled: false },
      Validators.required(schema)
    ),
  });

  get doc(): AbstractControl {
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
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
