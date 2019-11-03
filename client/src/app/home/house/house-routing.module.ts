import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HouseComponent} from './house.component';

const routes: Routes = [
  {path: '', redirectTo: 'my-home', pathMatch: 'full'},
  {path: 'my-home', component: HouseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule {
}
