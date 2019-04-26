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
});
