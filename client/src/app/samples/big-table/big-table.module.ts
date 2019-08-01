import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BigTableRoutingModule } from './big-table-routing.module';
import { BigTableComponent } from './big-table.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchValueComponent } from '../student/search-value/search-value.component';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';
import { CommonComponentModule } from 'src/app/shared/common-component/common-component.module';

@NgModule({
  declarations: [BigTableComponent, SearchValueComponent],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BigTableRoutingModule,
    PrimeNgModule,
    CommonComponentModule,
  ]
})
export class BigTableModule { }
