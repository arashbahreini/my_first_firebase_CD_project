import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { AddEditDialogComponent } from './add-edit.dialog/add-edit.dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StudentComponent, AddEditDialogComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ], entryComponents: [
    AddEditDialogComponent
  ]
})
export class StudentModule { }
