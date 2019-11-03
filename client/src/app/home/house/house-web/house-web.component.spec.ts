import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseWebComponent } from './house-web.component';

describe('HouseWebComponent', () => {
  let component: HouseWebComponent;
  let fixture: ComponentFixture<HouseWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
