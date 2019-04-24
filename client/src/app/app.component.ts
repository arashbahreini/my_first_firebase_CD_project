import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { LogService } from './services/log.service';
import { LogModel } from './model/log.model';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public studentDb: AngularFireList<any> = null;
  public students: any[];
  public student: any = {};
  public log: LogModel = new LogModel();

  constructor(
    db: AngularFireDatabase,
    private logService: LogService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.addLog();
  }

  addLog() {
    this.log = {
      browser: this.commonService.getUserPlatform().browser,
      browserVersion: this.commonService.getUserPlatform().browser_version,
      date: new Date(),
      device: this.commonService.getUserPlatform().device,
      os: this.commonService.getUserPlatform().os,
      osVersion: this.commonService.getUserPlatform().os_version,
      id: 'Not set yet',
      ip: '',
    };
    this.commonService.getIp().subscribe((res: LogModel) => {
      this.log.ip = res.ip;
      this.logService.addLog(this.log).subscribe((logRes: any) => { }, (error) => { });
    }, (error: any) => {
      this.log.ip = error;
      this.logService.addLog(this.log).subscribe((res) => { }, (logError: any) => { });
    });
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
