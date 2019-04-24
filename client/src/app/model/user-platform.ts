import { DeviceDetectorService } from 'ngx-device-detector';

export class UserPlatformModel extends DeviceDetectorService {
  public isWithTablet: boolean;
  public isWithMobile: boolean;
  public deviceInfo: any;
  setValue(data: DeviceDetectorService) {
    this.browser = data.browser,
    this.browser_version = data.browser_version,
    this.device = data.device,
    this.os = data.os,
    this.os_version = data.os_version,
    this.deviceInfo = data.getDeviceInfo();
    this.isWithMobile = data.isMobile();
    this.isWithTablet = data.isTablet();
  }
}
