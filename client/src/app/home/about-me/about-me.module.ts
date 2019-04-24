import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AboutMeRoutingModule } from './about-me-routing.module';
import { BioComponent } from './bio/bio.component';
import { AboutMeComponent } from './about-me.component';
import { GithubComponent } from './github/github.component';
import { FormsModule } from '@angular/forms';
import { StackoverflowComponent } from './stackoverflow/stackoverflow.component';
import { CommonComponentModule } from 'src/app/shared/common-component/common-component.module';

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
    CommonComponentModule,
  ],
  providers: [
    DatePipe
  ]
})
export class AboutMeModule { }
