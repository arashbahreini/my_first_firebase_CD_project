import { Component, OnInit } from '@angular/core';
import { StudentModel } from 'src/app/model/student.model';
import { MatDialog } from '@angular/material/dialog';
import { AddEditDialogComponent } from './add-edit.dialog/add-edit.dialog.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.sass']
})
export class StudentComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openAddEditDialog(data?: StudentModel) {
    const dialog = this.dialog.open(
      AddEditDialogComponent, {
        disableClose: true,
        data: data ? data : null,
        width: '50%'
      }
    );
    dialog.afterClosed().subscribe(x => {

    });
  }
}
