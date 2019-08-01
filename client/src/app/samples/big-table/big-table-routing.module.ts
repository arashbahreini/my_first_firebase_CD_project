import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BigTableComponent } from './big-table.component';

const routes: Routes = [
  { path: '', component: BigTableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BigTableRoutingModule { }
