import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutMeRoutingModule } from './about-me-routing.module';
import { BioComponent } from './bio/bio.component';
import { AboutMeComponent } from './about-me.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    BioComponent,
    AboutMeComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    AboutMeRoutingModule
  ]
})
export class AboutMeModule { }
