import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogModel } from '../model/log.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getIp(): Observable<LogModel> {
    return this.http.get<LogModel>('https://api.ipify.org/?format=json');
  }

  getIpInformation(log: LogModel): Observable<any> {
    return this.http.post<LogModel>('log/getIpInformation', { ip: log.ip });
  }
}
