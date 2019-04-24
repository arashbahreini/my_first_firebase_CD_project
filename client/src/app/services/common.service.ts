import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogModel } from '../model/log.model';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UserPlatformModel } from '../model/user-platform';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public userPlatform: UserPlatformModel;

  constructor(
    private http: HttpClient,
    private deviceService: DeviceDetectorService) { }

  getIp(): Observable<LogModel> {
    return this.http.get<LogModel>('https://api.ipify.org/?format=json');
  }

  getIpInformation(log: LogModel): Observable<any> {
    // return this.http.post<LogModel>('log/getIpInformation', { ip: log.ip });
    return this.http.get<LogModel>('http://api.ipstack.com/' + log.ip + '?access_key=9f79482ae6aca6a14914c07978b51b29');
  }

  getUserPlatform() {
    this.userPlatform = new UserPlatformModel(null);
    this.userPlatform.setValue(this.deviceService);
    return this.userPlatform;
  }
}
