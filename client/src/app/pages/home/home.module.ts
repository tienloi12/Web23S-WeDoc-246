import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { SharedComponent } from './components/shared/shared.component';
import { SavedComponent } from './components/saved/saved.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HomeComponent,
    HomeMainComponent,
    SharedComponent,
    SavedComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, MatMenuModule, MatButtonModule],
})
export class HomeModule {}
