import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from './app.module';
import { CommonService } from './services/common.service';
import { LogModel } from './model/log.model';
import { of, throwError } from 'rxjs';

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let commonService;
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [
      ],
      providers: [
      ]
    }).compileComponents();
  }));

  beforeEach(inject([CommonService], (s: any) => {
    commonService = s;
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));

  it('Should call addlog component on init. ', () => {
    spyOn(component, 'addLog');
    fixture.detectChanges();
    expect(component.addLog).toHaveBeenCalled();
  });

  it('Should get ip on calling addlog function.', () => {
    spyOn(commonService, 'getIp').and.returnValue(of({ ip: '100' }));
    component.addLog();
    expect(component.log.ip).toEqual('100');
  });

  it('Should return appropriate error on failur of calling getIp method', () => {
    spyOn(commonService, 'getIp').and.returnValue(throwError('I am error'));
    component.addLog();
    expect(component.log.ip).toEqual('I am error');
  });
});
