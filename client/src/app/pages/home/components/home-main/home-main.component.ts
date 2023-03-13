import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetFilesState, GetFileState } from 'src/app/ngrx/states/file.state';
import * as FileActions from 'src/app/ngrx/actions/file.action';
import { Observable } from 'rxjs';
import { DocumentFile } from 'src/app/models/file.model';

import { Router } from '@angular/router';
import { UserState } from 'src/app/ngrx/states/user.state';
import { UserModel } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.scss'],
})
export class HomeMainComponent implements OnInit {
  files$: Observable<DocumentFile[]>;
  user$: Observable<UserModel>;

  file$ !: Observable<GetFileState>;

  user!: UserModel;

  constructor(
    private store: Store<{
      getFiles: GetFilesState;
      getByAuthorId: GetFilesState;
      user: UserState;
    }>,
    private httpClient: HttpClient,
    private router: Router,
    private fileStore: Store<{ files: GetFilesState, file: GetFileState }>
  ) {
    this.user$ = store.select('user', 'user');
    this.store.select('user', 'user').subscribe((data) => {
      if (data) {
        this.user = data;
        store.dispatch(FileActions.getFilesByAuthorId({ authorId: data._id }));
      }
    });

    this.files$ = store.select('getFiles', 'files');
    this.file$ = fileStore.select('file');
    console.log(this.file$);

    // this.store.select('getFiles', 'files').subscribe((data) => {
    //   console.log(data);
    // });

    // this.store.select('getByAuthorId', 'files').subscribe((data) => {
    //   console.log(data);
    // });
  }

  newPage() {
    let file = <DocumentFile>{};
    file.authorId = this.user._id;
    file.authorName = this.user.displayName;
    file.collaborators = [];    
    file.title = 'Untitled';
    file.content = '';
    file.createdAt = new Date().toDateString();
    file.fileId = '';
    this.store.dispatch(FileActions.createFile({ file: file}));
    this.store.dispatch(FileActions.getFile({ fileId: file.fileId }));
    console.log(this.file$);
    this.file$.subscribe((data) => {
      console.log(data);
      this.router.navigate(['/paper', data.file.fileId]);
    });
  }

  ngOnInit(): void {
    this.store.dispatch(FileActions.getFiles());
  }

  openFile($event: any) {
    this.router.navigate(['/paper', $event.fileId]);
  }
}
