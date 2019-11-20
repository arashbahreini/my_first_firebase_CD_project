import {Component, OnInit} from '@angular/core';
import {RpiGeneralInformationModel} from '../../../model/rpi-general-information.model';
import {ResultModel} from '../../../model/result.model';
import {map} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';
import {DatabaseInfoModel} from '../../../model/database-info.model';
import {resolveTiming} from '@angular/animations/browser/src/util';
import {RpiService} from '../../../services/rpi.service';

@Component({
  selector: 'app-rpi',
  templateUrl: './rpi.component.html',
  styleUrls: ['./rpi.component.sass']
})
export class RpiComponent implements OnInit {

  public generalInformation: ResultModel<RpiGeneralInformationModel> = new ResultModel<RpiGeneralInformationModel>();
  public databases: ResultModel<DatabaseInfoModel[]> = new ResultModel<DatabaseInfoModel[]>();

  constructor(
    private rpiService: RpiService
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
    // this.getDbInfo();
  }

  getGeneralInformation() {
    this.generalInformation.load();
    this.rpiService.getSetting().subscribe((res: RpiGeneralInformationModel) => {
      console.log(res);
    }, (error) => {
      console.log(error);
    });
  }

  // saveGeneralInformation() {
  //   this.generalInformation.load();
  //   this.db.list('rpi-setting/')
  //     .update(this.generalInformation.data.key, this.generalInformation.data)
  //     .then((res: any) => {
  //       this.generalInformation.isLoading = false;
  //     }, (error: any) => {
  //       this.generalInformation.setError(error);
  //     });
  // }
}
