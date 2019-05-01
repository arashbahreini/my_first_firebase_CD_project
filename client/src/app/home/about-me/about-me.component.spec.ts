import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutMeComponent } from './about-me.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BioComponent } from './bio/bio.component';
import { GithubComponent } from './github/github.component';
import { StackoverflowComponent } from './stackoverflow/stackoverflow.component';
import { StatisticsComponent } from 'src/app/shared/common-component/statistics/statistics.component';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeviceDetectorModule, DeviceDetectorService } from 'ngx-device-detector';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CommonComponentModule } from 'src/app/shared/common-component/common-component.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

describe('AboutMeComponent', () => {
  let component: AboutMeComponent;
  let fixture: ComponentFixture<AboutMeComponent>;
  let p: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AboutMeComponent,
        BioComponent,
        GithubComponent,
        StackoverflowComponent],
      imports: [
        RouterTestingModule,
        PrimeNgModule,
        HttpClientTestingModule,
        DeviceDetectorModule,
        CommonComponentModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule],
      providers: [
        DeviceDetectorService, DatePipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    p = fixture.nativeElement.querySelector('p');
  });

  it('Should show Me menu', () => {
    expect(p.className).toEqual('btn btn-success fa fa-info-circle btn_menu');
  });

  it('Should active a route', () => {
    const bio = component.routes.find(x => x.route === 'github');
    component.activeButton('github');
    expect(bio.isActive).toEqual(true);
  });
});
