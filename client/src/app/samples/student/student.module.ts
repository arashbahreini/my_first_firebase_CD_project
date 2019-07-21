import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { AddEditDialogComponent } from './add-edit.dialog/add-edit.dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogComponent } from 'src/app/shared/common-component/delete-dialog/delete-dialog.component';
import { CommonComponentModule } from 'src/app/shared/common-component/common-component.module';
import { SearchValueComponent } from './search-value/search-value.component';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';

@NgModule({
  declarations: [StudentComponent, AddEditDialogComponent, SearchValueComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimeNgModule,
    CommonComponentModule
  ], entryComponents: [
    AddEditDialogComponent,
    DeleteDialogComponent
  ], providers: [DatePipe]
})
export class StudentModule { }
