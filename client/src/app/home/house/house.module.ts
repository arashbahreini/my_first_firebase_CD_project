import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HouseRoutingModule} from './house-routing.module';
import {HouseMobileComponent} from './house-mobile/house-mobile.component';
import {HouseWebComponent} from './house-web/house-web.component';
import {HouseComponent} from './house.component';

@NgModule({
  declarations: [
    HouseMobileComponent,
    HouseWebComponent,
    HouseComponent
  ],
  imports: [
    CommonModule,
    HouseRoutingModule
  ]
})
export class HouseModule {
}
