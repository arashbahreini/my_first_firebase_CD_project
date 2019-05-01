import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsComponent } from './statistics.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;
  let h2: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticsComponent],
      providers: [
        HttpClient,
        HttpHandler,
        DeviceDetectorService,
        AngularFireDatabase,
        DatePipe
      ],
      imports: [
        PrimeNgModule, AngularFireModule.initializeApp(environment.firebase),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    h2 = fixture.nativeElement.querySelector('h2');
  });

  it('Should show appropriate header.', () => {
    expect(h2.textContent).toEqual('Site statistics');
  });

  it('Should show Graph on click on Graph button', () => {
    // Arrenge
    component.showTable = true;
    // Act
    component.loadGraph();
    // Assert
    expect(component.showTable).toEqual(false);
  });

  it('Should return appropriate os icon', () => {
    expect(component.getOsIcon('windows')).toEqual('fa fa-windows');
    expect(component.getOsIcon('mac')).toEqual('fa fa-apple');
    expect(component.getOsIcon('linux')).toEqual('fa fa-linux');
    expect(component.getOsIcon('ios')).toEqual('fa fa-apple');
    expect(component.getOsIcon('android')).toEqual('fa fa-android');
    expect(component.getOsIcon('def')).toEqual('fa fa-exclamation');
  });

  it('Should get appropriate browser icon', () => {
    expect(component.getBrowserIcon('opera')).toEqual('fa fa-opera');
    expect(component.getBrowserIcon('safari')).toEqual('fa fa-safari');
    expect(component.getBrowserIcon('chrome')).toEqual('fa fa-chrome');
    expect(component.getBrowserIcon('ie')).toEqual('fa fa-internet-explorer');
    expect(component.getBrowserIcon('def')).toEqual('fa fa-exclamation');
  });
});
