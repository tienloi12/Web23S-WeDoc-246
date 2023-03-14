import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetFilesState } from 'src/app/ngrx/states/file.state';
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
export class HomeMainComponent {
  files$: Observable<DocumentFile[]>;
  user$: Observable<UserModel>;

  user!: UserModel;

  constructor(
    private store: Store<{
      getFiles: GetFilesState;
      getByAuthorId: GetFilesState;
      user: UserState;
    }>,
    private router: Router
  ) {
    this.user$ = store.select('user', 'user');
    this.store.select('user', 'user').subscribe((data) => {
      if (data) {
        this.user = data;
        console.log('test');
        store.dispatch(FileActions.getFilesByAuthorId({ authorId: data._id }));
      }
    });

    this.files$ = store.select('getFiles', 'files');
    // this.store.select('getFiles', 'files').subscribe((data) => {
    //   console.log(data);
    // });

    // this.store.select('getByAuthorId', 'files').subscribe((data) => {
    //   console.log(data);
    // });
  }

  newPaper() {
    this.router.navigate(['/paper']);
  }

  // ngOnInit(): void {
  //   this.store.dispatch(FileActions.getFiles());
  // }

  openFile($event: any) {
    // console.log($event);
    this.router.navigate(['/paper/' + $event]);
    //   this.openFile($event);
  }
}
