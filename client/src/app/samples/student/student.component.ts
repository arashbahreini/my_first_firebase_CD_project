import { Component, OnInit } from '@angular/core';
import { StudentModel } from 'src/app/model/student.model';
import { MatDialog } from '@angular/material/dialog';
import { AddEditDialogComponent } from './add-edit.dialog/add-edit.dialog.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { ResultModel } from 'src/app/model/result.model';
import { DeleteDialogComponent } from 'src/app/shared/common-component/delete-dialog/delete-dialog.component';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import * as firebase from 'firebase';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.sass'],
  animations: [
    trigger('openClose', [
      state('open', style({
        maxHeight: '300px',
      })),
      state('closed', style({
        height: '0px'
      })),
      transition('open => closed', [
        animate('0.1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class StudentComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private db: AngularFireDatabase) { }

  public students: ResultModel<StudentModel[]> = new ResultModel<StudentModel[]>();
  public studentsSearchResult: ResultModel<StudentModel[]> = new ResultModel<StudentModel[]>();
  public searchValue: string;
  public showSearchResult: boolean;

  ngOnInit() {
    this.getStudents();
  }

  openAddEditDialog(data?: StudentModel) {
    const dialogInput = data ? data : null;
    const dialog = this.dialog.open(
      AddEditDialogComponent, {
        disableClose: true,
        data: dialogInput,
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
        this.studentsSearchResult.setData(res);
      }, (error: any) => {
        this.students.setError(error);
      });
  }

  clearSearch() {
    this.searchValue = '';
    this.showSearchResult = false;
  }

  search(e: KeyboardEvent) {
    this.showSearchResult = true;
    this.studentsSearchResult.setData([]);
    if (this.searchValue === '') {
      this.showSearchResult = false;
      return;
    }
    this.students.data.forEach(element => {
      if (element.firstName.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()) ||
        element.lastName.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()) ||
        element.grade.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()) ||
        element.age.toString().includes(this.searchValue.toLocaleLowerCase()) ||
        element.address.city.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()) ||
        element.address.street.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()) ||
        this.datePipe.transform(element.dateOfBirth, 'yyyy/MM/dd').toString().includes(this.searchValue.toLocaleLowerCase())) {
        this.studentsSearchResult.data.push(element);
      }
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
        if (student.photoUrl) {
          const storageRef = firebase.storage().ref();
          storageRef.child(student.photoDirectory + '/' + student.photoName).delete().then((result: any) => {
            this.db.list(`/students/${student.key}`).remove();
          });
        } else {
          this.db.list(`/students/${student.key}`).remove();
        }
      }
    });
  }
}
