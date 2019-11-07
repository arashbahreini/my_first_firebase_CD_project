import {ManageComponent} from './manage.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {RpiComponent} from './rpi/rpi.component';

const routes: Routes = [
  {
    path: '', component: ManageComponent, children: [
      {path: 'users', component: UsersComponent},
      {path: 'rpi', component: RpiComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule {
}
