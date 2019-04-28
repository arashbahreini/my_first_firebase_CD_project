import { Component, OnInit } from '@angular/core';
import { StudentModel } from 'src/app/model/student.model';
import { MatDialog } from '@angular/material/dialog';
import { AddEditDialogComponent } from './add-edit.dialog/add-edit.dialog.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { ResultModel } from 'src/app/model/result.model';
import { DeleteDialogComponent } from 'src/app/shared/common-component/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.sass']
})
export class StudentComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private db: AngularFireDatabase) { }

  public students: ResultModel<StudentModel[]> = new ResultModel<StudentModel[]>();

  ngOnInit() {
    this.getStudents();
  }

  openAddEditDialog(data?: StudentModel) {
    const dialog = this.dialog.open(
      AddEditDialogComponent, {
        disableClose: true,
        data: data ? JSON.parse(JSON.stringify(data)) : null,
        width: '50%'
      }
    );
    dialog.afterClosed().subscribe(x => {
    });
  }

  getStudents() {
    this.students.load();
    this.db.list('/students').snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(x =>
            ({
              ...x.payload.val(),
              key: x.key,
            })
          );
        })
      )
      .subscribe((res: StudentModel[]) => {
        this.students.setData(res);
      }, (error: any) => {
        this.students.setError(error);
      });
  }

  delete(student: StudentModel) {
    const dialog = this.dialog.open(
      DeleteDialogComponent,
      {
        disableClose: true,
        data: { message: `Are you sure to delete ${student.firstName} ${student.lastName} ?` },
      }
    );
    dialog.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.db.list(`/students/${student.key}`).remove();
      }
    });
  }
}
