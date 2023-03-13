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
  title!: string;
  // saveFile!: any;
  // file$: Observable<DocumentFile>;
  // file!: DocumentFile;
  userMain!: UserModel;
  constructor(
    private httpClient: HttpClient,
    private store: Store<{ file: CreateFileState }>
  ) {
    // this.file$ = store.select('file', 'file');
    // this.store.select('file', 'file').subscribe((data) => {
    //   console.log(data.content);
    //   return data;
    // });
    // console.log('file service')
  }

  createFile(file: DocumentFile) {
    return this.httpClient.post('http://localhost:3000/v1/file/create', file);
  }

  updateFile(fileId: string, file: DocumentFile) {
    return this.httpClient.put(
      `http://localhost:3000/v1/file/update/${fileId}`,
      file
    );
  }

  getFileDetail(fileId: string) {
    return this.httpClient.get(`http://localhost:3000/v1/file/info/${fileId}`);
  }

  getFiles() {
    return this.httpClient.get('http://localhost:3000/v1/file/all');
  }

  getFilesByAuthorId(authorId: string) {
    return this.httpClient.get(
      `http://localhost:3000/v1/file/author/${authorId}`
    );
  }

  save(user: UserModel) {
    this.content = document.querySelector(
      '.ProseMirror.NgxEditor__Content'
    )!.innerHTML;
    let file!: DocumentFile;
    file = {
      fileId: Date.now().toString(),
      authorId: user._id,
      authorName: user.displayName,
      title: this.title,
      content: this.content,
      collaborators: [user],
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };
    this.store.dispatch(
      FileActions.createFile({
        file: file,
      })
    );
  }

  update(user: UserModel) {
    //update service
  }
}
