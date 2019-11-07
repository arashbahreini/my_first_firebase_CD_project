import {Component, OnInit} from '@angular/core';
import {RpiGeneralInformationModel} from '../../../model/rpi-general-information.model';
import {ResultModel} from '../../../model/result.model';
import {map} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';
import {DatabaseInfoModel} from '../../../model/database-info.model';
import {resolveTiming} from "@angular/animations/browser/src/util";

@Component({
  selector: 'app-rpi',
  templateUrl: './rpi.component.html',
  styleUrls: ['./rpi.component.sass']
})
export class RpiComponent implements OnInit {

  public generalInformation: ResultModel<RpiGeneralInformationModel> = new ResultModel<RpiGeneralInformationModel>();
  public databases: ResultModel<DatabaseInfoModel[]> = new ResultModel<DatabaseInfoModel[]>();

  constructor(
    private db: AngularFireDatabase
  ) {
  }

  ngOnInit() {
    this.databases.data = [];
    this.databases.data.push({
      name: 'RPI-health'
    }, {
      name: 'test-moisture'
    });
    this.getGeneralInformation();
    this.getDbInfo();
  }

  getGeneralInformation() {
    this.generalInformation.load();
    this.db.list('/rpi-setting').snapshotChanges()
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
      .subscribe((res: RpiGeneralInformationModel[]) => {
        this.generalInformation.setData(res[0]);
      }, (error: any) => {
        this.generalInformation.setError(error);
      });
  }

  saveGeneralInformation() {
    this.generalInformation.load();
    this.db.list('rpi-setting/')
      .update(this.generalInformation.data.key, this.generalInformation.data)
      .then((res: any) => {
        this.generalInformation.isLoading = false;
      }, (error: any) => {
        this.generalInformation.setError(error);
      });
  }

  getDbInfo() {
    this.db.list('/test-moisture').remove().then((res: any) => {
      debugger;
    }, (error: any) => {
      debugger;
    });
    // this.databases.data.forEach(element => {
    //   debugger;
    //   this.db.list(`/${element.name}`).snapshotChanges()
    //     .pipe(
    //       map(changes => {
    //         return changes.length;
    //       })
    //     )
    //     .subscribe((res: any) => {
    //       debugger;
    //     }, (error: any) => {
    //       debugger;
    //     });
    // });
  }
}
