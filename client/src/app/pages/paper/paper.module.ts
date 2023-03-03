import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaperRoutingModule } from './paper-routing.module';
import { PaperComponent } from './paper.component';
import { ShareModule } from '../../models/share/share.module';


@NgModule({
  declarations: [PaperComponent],
  imports: [CommonModule, PaperRoutingModule, ShareModule],
})
export class PaperModule {}
