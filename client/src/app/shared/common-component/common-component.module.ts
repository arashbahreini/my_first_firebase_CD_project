import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics/statistics.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SearchValueComponent } from 'src/app/samples/student/search-value/search-value.component';

@NgModule({
  declarations: [
    StatisticsComponent,
    DeleteDialogComponent,
    SearchValueComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
  ], exports: [
    StatisticsComponent,
    DeleteDialogComponent,
    SearchValueComponent
  ]
})
export class CommonComponentModule { }
