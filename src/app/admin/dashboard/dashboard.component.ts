import { ChartModel } from './../../model/chart.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { LogModel } from 'src/app/model/log.model';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ResultModel } from 'src/app/model/result.model';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {

  public logDb: AngularFireList<LogModel> = null;
  public logs: LogModel[] = [];
  public chartData: ResultModel<ChartModel> = new ResultModel<ChartModel>();
  public days: number;

  constructor(db: AngularFireDatabase, private datePipe: DatePipe) {
    this.logDb = db.list('/logs');
  }

  ngOnInit() {
    this.getLogs(7);
  }

  getlastMonths() {
    return this.datePipe.transform(new Date(new Date().getFullYear(), new Date().getMonth(), 0), 'MMM') +
      ',' +
      this.datePipe.transform(new Date(), 'MMM');
  }

  getLogs(days: number) {
    this.days = days;
    this.chartData.load();
    this.logDb.snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({ ...c.payload.val() }));
    })).subscribe(
      (res: LogModel[]) => {
        const data = new ChartModel();
        data.datasets[0] = {
          label: 'Visit',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: []
        };
        if (days === 7) {
          for (let i = 6; i >= 0; i--) {

            data.labels.push((new Date().getDate() - i).toString());
            data.datasets[0].data.push(
              res.filter(x => +this.datePipe.transform(x.date, 'dd') === new Date().getDate() - i).length
            );
          }
        } else if (days === 30) {

          let lastMonthDay = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate() - (30 - new Date().getDate()) + 1;
          let newMonthDate = 1;
          for (let i = 29; i >= 0; i--) {
            if (lastMonthDay <= new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate()) {
              data.labels.push(lastMonthDay.toString());
              data.datasets[0].data.push(
                res.filter(x => +this.datePipe.transform(x.date, 'mm') === new Date().getMonth()
                  && +this.datePipe.transform(x.date, 'dd') === new Date().getDate() - 1).length
              );
              lastMonthDay = lastMonthDay + 1;
            } else {
              data.labels.push(newMonthDate.toString());
              data.datasets[0].data.push(
                res.filter(x => +this.datePipe.transform(x.date, 'dd') === new Date().getDate() - i).length
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
              res.filter(x => +this.datePipe.transform(x.date, 'yyyy') === new Date().getFullYear()
                && this.datePipe.transform(x.date, 'MMM') === month).length
            );
          });
        }
        this.chartData.setData(data);
      }
    );
  }
}
