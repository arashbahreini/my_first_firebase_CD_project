import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics/statistics.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [StatisticsComponent, DeleteDialogComponent],
  imports: [
    CommonModule,
    PrimeNgModule,
  ], exports: [
    StatisticsComponent,
    DeleteDialogComponent
  ]
})
export class CommonComponentModule { }
