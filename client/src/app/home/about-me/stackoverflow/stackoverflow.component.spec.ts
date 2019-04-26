import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackoverflowComponent } from './stackoverflow.component';
import { GithubService } from 'src/app/services/github.service';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';

describe('StackoverflowComponent', () => {
  let component: StackoverflowComponent;
  let fixture: ComponentFixture<StackoverflowComponent>;
  let h2: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StackoverflowComponent],
      providers: [HttpClient, HttpHandler, DeviceDetectorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackoverflowComponent);
    component = fixture.componentInstance;
    h2 = fixture.nativeElement.querySelector('h2');
  });

  it('Should have appropriate header.', () => {
    expect(h2.textContent).toEqual('Best Stackoverflow activities');
  });

  it('Should swith to Top Questions.', () => {
    // Arrenge
    component.showAnswers = true;
    // Act
    component.onShowQuestions();
    // Assert
    expect(component.showAnswers).toEqual(false);
  });
});
