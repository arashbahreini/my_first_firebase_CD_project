import { PrimeNgModule } from './../shared/prime-ng/prime-ng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { CommonComponentModule } from '../shared/common-component/common-component.module';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PrimeNgModule,
    CommonComponentModule
  ]
})
export class AdminModule { }
