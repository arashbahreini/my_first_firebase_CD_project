import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { LogModel } from 'src/app/model/log.model';
import { ResultModel } from 'src/app/model/result.model';
import { ChartModel } from 'src/app/model/chart.model';
import { DatePipe } from '@angular/common';
import { map, take } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.sass']
})
export class StatisticsComponent implements OnInit {

  public logDb: AngularFireList<LogModel> = null;
  public logs: LogModel[] = [];
  public chartData: ResultModel<ChartModel> = new ResultModel<ChartModel>();
  public days: number;
  public showTable: boolean;
  public tableData: ResultModel<LogModel[]> = new ResultModel<LogModel[]>();
  public isWithMobile: boolean;

  constructor(
    db: AngularFireDatabase,
    private datePipe: DatePipe,
    private commonService: CommonService) {
    this.logDb = db.list('/logs');
    this.isWithMobile = commonService.getUserPlatform().isWithMobile;
  }

  ngOnInit() {
    this.loadTable();
  }

  getOsIcon(os) {
    switch (os.toLowerCase()) {
      case 'windows':
        return 'fa fa-windows';
      case 'mac':
        return 'fa fa-apple';
      case 'linux':
        return 'fa fa-linux';
      case 'ios':
        return 'fa fa-apple';
      case 'android':
        return 'fa fa-android';
      default:
        return 'fa fa-exclamation';
    }
  }

  getBrowserIcon(browser: string) {
    switch (browser.toLowerCase()) {
      case 'opera':
        return 'fa fa-opera';
      case 'safari':
        return 'fa fa-safari';
      case 'chrome':
        return 'fa fa-chrome';
      case 'ie':
        return 'fa fa-internet-explorer';
      default:
        return 'fa fa-exclamation';
    }
  }

  getlastMonths() {
    return this.datePipe.transform(new Date(new Date().getFullYear(), new Date().getMonth(), 0), 'MMM') +
      ',' +
      this.datePipe.transform(new Date(), 'MMM');
  }

  loadTable() {
    this.showTable = true;
    this.getLogsInTable();
  }

  loadGraph() {
    this.showTable = false;
    this.getLogsInGraph(7);
  }

  getLogsInTable() {
    this.tableData.load();
    this.logDb.snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ ...c.payload.val() }));
        }),
        map(x => x.reverse()),
        map(x => x.slice(0, 20))
      ).subscribe((res: LogModel[]) => {
        this.tableData.setData(res);
        this.tableData.data.forEach(element => {
          element.country = new ResultModel<string>();
          element.city = new ResultModel<string>();
          this.getIpInformation(element);
        });
      });
  }

  getIpInformation(log: LogModel) {
    if (typeof log.ip === 'string') {
      log.country.load();
      log.city.load();
      this.commonService.getIpInformation(log).subscribe((res: any) => {
        log.country.setData(res.country_name);
        log.city.setData(res.city);
      }, (error: any) => {
        log.country.setError('Paid plan needed');
        log.city.setError('Paid plan needed');
      });
    } else {
      return 'unknown';
    }
  }

  getLogsInGraph(days: number) {
    this.days = days;
    this.chartData.load();
    this.logDb.snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({ ...c.payload.val() }));
    })).subscribe(
      (res: LogModel[]) => {
        const data = new ChartModel();
        data.datasets[0] = {
          label: 'PC',
          backgroundColor: '#FF6347',
          borderColor: '#FF8C00',
          data: []
        };
        data.datasets[1] = {
          label: 'Phone',
          backgroundColor: '#3CB371',
          borderColor: '#3CB371',
          data: []
        };
        if (days === 7) {
          for (let i = 6; i >= 0; i--) {
            data.labels.push((this.datePipe.transform(
              new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - i), 'EEEE')).toString());
            data.datasets[0].data.push(
              res.filter(x =>
                (x.os === 'Windows' || x.os === 'Linux' || x.os === 'Mac') &&
                +this.datePipe.transform(x.date, 'dd') === new Date().getDate() - i).length
            );
            data.datasets[1].data.push(
              res.filter(x =>
                (x.os === 'iOS' || x.os === 'Android') &&
                +this.datePipe.transform(x.date, 'dd') === new Date().getDate() - i).length
            );
          }
        } else if (days === 30) {

          let lastMonthDay = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate() - (30 - new Date().getDate()) + 1;
          let newMonthDate = 1;
          for (let i = 29; i >= 0; i--) {
            if (lastMonthDay <= new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate()) {
              data.labels.push(lastMonthDay.toString());
              data.datasets[0].data.push(
                res.filter(x =>
                  (x.os === 'Windows' || x.os === 'Linux' || x.os === 'Mac') &&
                  +this.datePipe.transform(x.date, 'mm') - 1 === new Date().getMonth()
                  && +this.datePipe.transform(x.date, 'dd') === new Date().getDate() - 1).length
              );
              data.datasets[1].data.push(
                res.filter(x =>
                  (x.os === 'iOS' || x.os === 'Android') &&
                  +this.datePipe.transform(x.date, 'mm') - 1 === new Date().getMonth()
                  && +this.datePipe.transform(x.date, 'dd') === new Date().getDate() - 1).length
              );
              lastMonthDay = lastMonthDay + 1;
            } else {
              data.labels.push(newMonthDate.toString());

              data.datasets[0].data.push(
                res.filter(x =>
                  (x.os === 'Windows' || x.os === 'Linux' || x.os === 'Mac') &&
                  +this.datePipe.transform(x.date, 'dd') === new Date().getDate() - i).length
              );

              data.datasets[1].data.push(
                res.filter(x =>
                  (x.os === 'iOS' || x.os === 'Android') &&
                  +this.datePipe.transform(x.date, 'dd') === new Date().getDate() - i).length
              );
              newMonthDate = newMonthDate + 1;
            }
          }
        } else if (days === 365) {
          const dates: Date[] = [];
          for (let i = 1; i <= 12; i++) {
            dates.push(
              i <= 12 - new Date().getMonth() + 1 ?
                new Date(new Date().getFullYear() - 1, new Date().getMonth() + i + 1, 0) :
                new Date(new Date().getFullYear(), new Date().getMonth() + i + 1, 0)
            );
          }
          dates.forEach(element => {
            const month = this.datePipe.transform(element, 'MMM');
            data.labels.push(month);

            data.datasets[0].data.push(
              res.filter(x =>
                (x.os === 'Windows' || x.os === 'Linux' || x.os === 'Mac') &&
                +this.datePipe.transform(x.date, 'yyyy') === new Date().getFullYear()
                && this.datePipe.transform(x.date, 'MMM') === month).length
            );

            data.datasets[1].data.push(
              res.filter(x =>
                (x.os === 'iOS' || x.os === 'Android') &&
                +this.datePipe.transform(x.date, 'yyyy') === new Date().getFullYear()
                && this.datePipe.transform(x.date, 'MMM') === month).length
            );
          });
        }
        this.chartData.setData(data);
      }
    );
  }
}
