import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LogModel } from '../model/log.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { }

  addLog(log: LogModel): Observable<any> {
    return this.http.post<LogModel>('log/add', log);
  }
}
