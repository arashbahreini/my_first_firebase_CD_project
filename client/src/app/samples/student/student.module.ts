import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { AddEditDialogComponent } from './add-edit.dialog/add-edit.dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogComponent } from 'src/app/shared/common-component/delete-dialog/delete-dialog.component';
import { CommonComponentModule } from 'src/app/shared/common-component/common-component.module';
import { SearchValueComponent } from './search-value/search-value.component';

@NgModule({
  declarations: [StudentComponent, AddEditDialogComponent, SearchValueComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonComponentModule
  ], entryComponents: [
    AddEditDialogComponent,
    DeleteDialogComponent
  ]
})
export class StudentModule { }
