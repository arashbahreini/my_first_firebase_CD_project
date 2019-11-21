import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RpiGeneralInformationModel} from '../model/rpi-general-information.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RpiService {

  constructor(private http: HttpClient) {
  }

  public getSetting(): Observable<RpiGeneralInformationModel> {
    return this.http.get<RpiGeneralInformationModel>('rpi/getSettings');

  }
}
