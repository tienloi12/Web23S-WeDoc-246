import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { DocumentFile } from '../models/file.model';
import { CreateFileState } from '../ngrx/states/file.state';
import { Observable } from 'rxjs';
import * as FileActions from '../ngrx/actions/file.action';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  content!: string;
  saveFile!: any;
  // file$: Observable<FileState>;
  userMain!: UserModel;
  constructor(
    private httpClient: HttpClient,
    private store: Store<{ file: CreateFileState }>
  ) {
    // this.file$ = store.select('file');
  }

  createFile(file: DocumentFile) {
    return this.httpClient.post('http://localhost:3000/v1/file/create', file);
  }

  // getFile(fileId: string) {
  //   return this.httpClient.get<DocumentFile>(
  //     `http://localhost:3000/v1/file/${fileId}`
  //   );
  // }

  getFiles() {
    return this.httpClient.get('http://localhost:3000/v1/file/all');
  }

  save(user: UserModel) {
    console.log(user);
    this.content = document.querySelector(
      '.ProseMirror.NgxEditor__Content'
    )!.innerHTML;
    let file!: DocumentFile;
    file = {
      fileId: Date.now().toString(),
      authorId: user._id,
      authorName: user.displayName,
      content: this.content,
      collaborators: [user],
      createdAt: new Date().toString(),
    };
    this.store.dispatch(
      FileActions.createFile({
        file: file,
      })
    );
  }
}
