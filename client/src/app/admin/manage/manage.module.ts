import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { ManageComponent } from './manage.component';
import { UsersComponent } from './users/users.component';
import { RpiComponent } from './rpi/rpi.component';
import {MaterialModule} from '../../shared/material/material.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [ManageComponent, UsersComponent, RpiComponent],
  imports: [
    CommonModule,
    ManageRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class ManageModule { }
