import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { PlantComponent } from './plant/plant.component';
import { ContentDashboardComponent } from './content-dashboard/content-dashboard.component';

@NgModule({
  declarations: [ContentComponent, TemperatureComponent, PlantComponent, ContentDashboardComponent],
  imports: [
    CommonModule,
    ContentRoutingModule,
    FormsModule
  ]
})
export class ContentModule { }
