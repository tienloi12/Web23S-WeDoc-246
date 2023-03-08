import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaperRoutingModule } from './paper-routing.module';
import { PaperComponent } from './paper.component';
import { CustomMenuComponent } from 'src/app/components/custom-menu/custom-menu.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [PaperComponent, CustomMenuComponent],
  imports: [
    CommonModule,
    PaperRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
  ],
})
export class PaperModule {}
