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

  getIpInformation(ip: string): Observable<any> {
    return this.http.get<any>('http://api.ipstack.com/' + ip + '?access_key=9f79482ae6aca6a14914c07978b51b29');
  }
}
