import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [],
  exports: [
    ButtonModule,
    ChartModule,
    FileUploadModule
  ]
})
export class PrimeNgModule { }
