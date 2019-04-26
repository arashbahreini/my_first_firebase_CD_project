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

  // it('should return an appropriate form of data', () => {
  //   // Arrange
  //   const expectedValue = { ip : '91.99.5.103'};
  //   debugger;
  //   // Act
  //   httpClientSpy.get.and.returnValue(expectedValue);

  //   // Assert
  //   commonService.getIp().subscribe(x => {
  //     debugger;
  //   });
  // });
  // it('should be created', () => {
  //   const service: CommonService = TestBed.get(CommonService);
  //   expect(service).toBeTruthy();
  // });
});
