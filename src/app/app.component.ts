import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public studentDb: AngularFireList<any> = null;
  public students: any[];
  public student: any = {};

  constructor(db: AngularFireDatabase) {
    this.studentDb = db.list('/Students');
  }

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.studentDb.snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }))
      .subscribe((res) => {
        this.students = res;
      });
  }

  submit() {
    this.studentDb.push(this.student);
    this.student = {};
  }

  delete(student: any) {
    this.studentDb.remove(student.key);
  }
}
