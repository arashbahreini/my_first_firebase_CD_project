import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics/statistics.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    PrimeNgModule
  ], exports: [
    StatisticsComponent
  ]
})
export class CommonComponentModule { }
