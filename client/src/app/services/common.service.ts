import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, fromEvent, merge } from 'rxjs';
import { LogModel } from '../model/log.model';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UserPlatformModel } from '../model/user-platform';
import { mapTo } from 'rxjs/operators';

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
    return this.http.get<LogModel>('https://ipapi.co/' + log.ip + '/json');
  }

  getUserPlatform() {
    this.userPlatform = new UserPlatformModel(null);
    this.userPlatform.setValue(this.deviceService);
    return this.userPlatform;
  }

  hasInternet(): Observable<boolean> {
    return merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    );
  }
}
