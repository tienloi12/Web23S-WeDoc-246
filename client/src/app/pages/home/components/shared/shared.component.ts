import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetFilesState } from 'src/app/ngrx/states/file.state';
import { DocumentFile } from 'src/app/models/file.model';
import * as FileActions from 'src/app/ngrx/actions/file.action';
@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss'],
})
export class SharedComponent implements OnInit {
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
