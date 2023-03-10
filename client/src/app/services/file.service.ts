import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FileModel } from '../models/file.model';
import { FileState } from '../ngrx/states/file.state';
import { Observable } from 'rxjs';
import * as FileActions from '../ngrx/actions/file.action';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  content!: string;
  saveFile!: any;
  file$: Observable<FileState>;
  userMain!: UserModel;
  constructor(
    private httpClient: HttpClient,
    private store: Store<{ file: FileState }>
  ) {
    this.file$ = store.select('file');
  }

  createFile(file: FileModel) {
    return this.httpClient.post('http://localhost:3000/v1/file/create', file);
  }

  getFile(fileId: string) {
    return this.httpClient.get<FileModel>(
      `http://localhost:3000/v1/file/${fileId}`
    );
  }

  getFiles() {
    return this.httpClient.get('http://localhost:3000/v1/file/all');
  }

  save(user: UserModel) {
    this.content = document.querySelector(
      '.ProseMirror.NgxEditor__Content'
    )!.innerHTML;
    let file!: FileModel;
    file = {
      content: this.content,
      fileId: Date.now().toString(),
      uidMain: user.uid,
      users: [user],
    };
    this.store.dispatch(
      FileActions.createFile({
        file: file,
      })
    );
  }
}
