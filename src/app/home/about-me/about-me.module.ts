import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutMeRoutingModule } from './about-me-routing.module';
import { BioComponent } from './bio/bio.component';
import { AboutMeComponent } from './about-me.component';
import { GithubComponent } from './github/github.component';
import { FormsModule } from '@angular/forms';
import { StackoverflowComponent } from './stackoverflow/stackoverflow.component';

@NgModule({
  declarations: [
    BioComponent,
    AboutMeComponent,
    GithubComponent,
    StackoverflowComponent
  ],
  imports: [
    CommonModule,
    AboutMeRoutingModule,
    FormsModule,
  ]
})
export class AboutMeModule { }
