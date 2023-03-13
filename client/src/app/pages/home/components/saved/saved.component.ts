import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DocumentFile } from 'src/app/models/file.model';
import * as FileActions from 'src/app/ngrx/actions/file.action';
import { GetFilesState } from 'src/app/ngrx/states/file.state';


@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit{
  files$: Observable<DocumentFile[]>;

  constructor(
    private store: Store<{ getFiles: GetFilesState }>,
    private router: Router
  ) {
    this.files$ = store.select('getFiles', 'files');
    this.store.select('getFiles', 'files').subscribe((data) => {
      console.log(data);
    });
  }
  ngOnInit(): void {
    this.store.dispatch(FileActions.getFiles());
  }
}
