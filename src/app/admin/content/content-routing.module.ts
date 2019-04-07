import { ContentDashboardComponent } from './content-dashboard/content-dashboard.component';
import { ContentComponent } from './content.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantComponent } from './plant/plant.component';
import { TemperatureComponent } from './temperature/temperature.component';

const routes: Routes = [
  {
    path: '', component: ContentComponent, children: [
      { path: '', component: ContentDashboardComponent },
      { path: 'plant', component: PlantComponent },
      { path: 'temperature', component: TemperatureComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
