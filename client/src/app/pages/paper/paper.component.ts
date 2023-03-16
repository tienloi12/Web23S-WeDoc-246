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
import { GetFileDetailState } from 'src/app/ngrx/states/file.state';
import { ActivatedRoute } from '@angular/router';
import { style } from '@angular/animations';

import {
  ySyncPlugin,
  yCursorPlugin,
  yUndoPlugin,
  undo,
  redo,
} from 'y-prosemirror';
// import { awareness, type } from 'src/app/collab/yjs';
import { keymap } from 'prosemirror-keymap';
import { history } from 'prosemirror-history';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { UserState } from 'src/app/ngrx/states/user.state';
import { DecorationAttrs } from 'prosemirror-view';

const ydoc = new Y.Doc();


@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class PaperComponent implements OnInit, OnDestroy {
  file$ = this.fileStore.select('getFile');
  user$ = this.fileStore.select('user');
  userInfo!: any;
  editordoc = '';
  constructor(
    public authService: AuthService,
    public fileService: FileService,
    private fileStore: Store<{ getFile: GetFileDetailState, user: UserState }>,
    private activedRoute: ActivatedRoute
  ) {}

  provider = new WebsocketProvider('ws://localhost:3000', 'paper', ydoc, {
    params: { docId: this.activedRoute.snapshot.params['id']},
  });

  type = ydoc.getXmlFragment('prosemirror');

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

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.userInfo = user.user;
      this.provider.awareness.setLocalStateField('user', {name:  user.user.displayName ?? 'Anonymous', color: '#' + Math.floor(Math.random() * 16777215).toString(16)});
      
    })
    let input = document.querySelector(".NgxEditor__MenuBar");
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
      plugins: [
        // history(),
        ySyncPlugin(this.type),
        yCursorPlugin(this.provider.awareness, {
          cursorBuilder: (user: any) => {
            console.log(user);
            const cursor = document.createElement('span');
            cursor.setAttribute(
              'style',
              ` border-left: 1px solid ${user.color}; 
                border-right: 1px solid ${user.color}; 
                border-color: ${user.color}; 
                position: relative;
                pointer-events: none;  
                margin-left: -1px;
                margin-right: -1px;
                `
            );
            const userDiv = document.createElement('div');
            userDiv.setAttribute(
              'style',
              `background-color: ${user.color}; 
               position: absolute; 
               top: -1.05em;
               left: -1px;
               color: white;
               font-size: 13px;
               padding-left: 2px;
               padding-right: 2px;
               white-space: nowrap;
               user-select: none;
               `
            );
            userDiv.insertBefore(document.createTextNode(user.name), null);
            cursor.insertBefore(userDiv, null);
            return cursor;
          },
          selectionBuilder: (user: any) => {
            const selection : DecorationAttrs = {
              style: `background-color: ${user.color}`,
            }
            // selection.insertBefore(document.createTextNode(user.name), null);
            return selection;
          }
        }),
        yUndoPlugin(),
        keymap({
          'Mod-z': undo,
          'Mod-y': redo,
          'Mod-Shift-z': redo,
        }),
      ],
    });
    this.fileStore.dispatch(
      FileActions.getFileDetail({
        fileId: this.activedRoute.snapshot.params['id'],
      })
    );
    this.file$.subscribe((file: any) => {
      if (file) {
        this.editor.setContent(toDoc(file.file.content));
        let title = document.querySelector('#title') as HTMLInputElement;
        title.value = file.file.title;
      }
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
