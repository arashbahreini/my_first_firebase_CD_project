import { TestBed } from '@angular/core/testing';

import { CommonService } from './common.service';
import { DeviceDetectorService } from 'ngx-device-detector';

let commonService: CommonService;
let httpClientSpy: { get: jasmine.Spy };
let deviceDetectorService: DeviceDetectorService;

describe('CommonService', () => {
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    deviceDetectorService = new DeviceDetectorService(1);
    commonService = new CommonService(httpClientSpy as any, deviceDetectorService);
  });

});
