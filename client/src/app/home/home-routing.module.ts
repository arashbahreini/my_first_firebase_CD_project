import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HouseComponent } from './house/house.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', redirectTo: 'about-me', pathMatch: 'full' },
      { path: 'about-me', loadChildren: './about-me/about-me.module#AboutMeModule' },
      // { path: 'house', component: HouseComponent },
      { path: 'house', loadChildren: './house/house.module#HouseModule'},
      { path: 'login', component: LoginComponent },
      {
        path: 'samples/student',
        loadChildren: '../samples/student/student.module#StudentModule'
      },
      {
        path: 'samples/big-table',
        loadChildren: '../samples/big-table/big-table.module#BigTableModule'
      },
      {
        path: 'samples/chat',
        loadChildren: '../samples/chat/chat.module#ChatModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
