import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetFilesState } from 'src/app/ngrx/states/file.state';
import * as FileActions from 'src/app/ngrx/actions/file.action';
import { Observable } from 'rxjs';
import { DocumentFile } from 'src/app/models/file.model';
@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.scss'],
})
export class HomeMainComponent implements OnInit {
  files$: Observable<DocumentFile[]>;

  constructor(private store: Store<{ getFiles: GetFilesState }>) {
    this.files$ = store.select('getFiles', 'files');
    this.store.select('getFiles', 'files').subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.store.dispatch(FileActions.getFiles());
  }
}
