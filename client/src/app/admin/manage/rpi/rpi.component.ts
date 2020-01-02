import {Component, OnInit} from '@angular/core';
import {RpiGeneralInformationModel} from '../../../model/rpi-general-information.model';
import {ResultModel} from '../../../model/result.model';
import {RpiService} from '../../../services/rpi.service';
import {DbCatalogsModel} from '../../../model/catalogs.model';

@Component({
  selector: 'app-rpi',
  templateUrl: './rpi.component.html',
  styleUrls: ['./rpi.component.sass']
})
export class RpiComponent implements OnInit {

  public generalInformation: ResultModel<RpiGeneralInformationModel> = new ResultModel<RpiGeneralInformationModel>();
  public catalogs: ResultModel<DbCatalogsModel> = new ResultModel<DbCatalogsModel>();

  constructor(
    private rpiService: RpiService
  ) {
  }

  ngOnInit() {
    this.getGeneralInformation();
    this.getCatalogs();
  }

  getGeneralInformation() {
    this.generalInformation.load();
    this.rpiService.getSetting().subscribe((res: RpiGeneralInformationModel) => {
      this.generalInformation.setData(res);
    }, (error) => {
      this.generalInformation.setError(error);
    });
  }

  getCatalogs() {
    this.catalogs.load();
    this.rpiService.getCatalogs().subscribe((res: any) => {
      this.catalogs.setData({
        rpiHealth: res['RPI-health'],
        rpiMoisture: res['RPI-moisture']
      });
      this.catalogs.setData(res);
    }, (error) => {
      this.catalogs.setError(error);
    });
  }

  removeCollection(key) {

  }

  saveGeneralInformation() {
    this.generalInformation.load();
    this.rpiService.saveSetting(this.generalInformation.data).subscribe(
      (res: any) => {
        this.getGeneralInformation();
      }, (error: any) => {
        this.generalInformation.setError(error);
      }
    );
  }
}
