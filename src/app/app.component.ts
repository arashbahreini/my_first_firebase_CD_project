import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LogService } from './services/log.service';
import { LogModel } from './model/log.model';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DeviceDetectorService]
})
export class AppComponent implements OnInit {

  public studentDb: AngularFireList<any> = null;
  public students: any[];
  public student: any = {};
  public log: LogModel = new LogModel();

  constructor(
    db: AngularFireDatabase,
    private deviceService: DeviceDetectorService,
    private logService: LogService,
    private commonService: CommonService) {
    // this.studentDb = db.list('/Students');
  }

  ngOnInit() {
    this.addLog();
  }

  addLog() {
    console.log(this.deviceService);
    this.log = {
      browser: this.deviceService.browser,
      browserVersion: this.deviceService.browser_version,
      date: new Date(),
      device: this.deviceService.device,
      os: this.deviceService.os,
      osVersion: this.deviceService.os_version,
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
