import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeSidebarComponent } from './components/home-sidebar/home-sidebar.component';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { HomeShareComponent } from './components/home-share/home-share.component';
import { HomeHeaderComponent } from './components/home-header/home-header.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomeSidebarComponent,
    HomeMainComponent,
    HomeShareComponent,
    HomeHeaderComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
