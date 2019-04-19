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

  ngOnInit() {

  }
}
