import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HouseComponent } from './house/house.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [HomeComponent, HouseComponent, LoginComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    // BrowserAnimationsModule
  ]
})
export class HomeModule { }
