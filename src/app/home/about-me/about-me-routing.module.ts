import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutMeComponent } from './about-me.component';
import { BioComponent } from './bio/bio.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: '', component: AboutMeComponent, children: [ ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutMeRoutingModule { }
