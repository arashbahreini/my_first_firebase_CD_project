import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubComponent } from './github.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';

describe('GithubComponent', () => {
  let component: GithubComponent;
  let fixture: ComponentFixture<GithubComponent>;
  let h2: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GithubComponent],
      providers: [HttpClient, HttpHandler, DeviceDetectorService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    h2 = fixture.nativeElement.querySelector('h2');
  });

  it('Should show appropriate header.', () => {
    expect(h2.textContent).toEqual('Last github activities');
  });

  // it('shoud test loading ...', () => {
  //   component.isLoading = true;
  //   component.getGithubData();
  //   expect(component.isLoading).toBe(false);
  // });
});
