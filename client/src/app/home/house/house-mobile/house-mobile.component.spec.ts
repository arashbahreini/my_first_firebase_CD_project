import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseMobileComponent } from './house-mobile.component';

describe('HouseMobileComponent', () => {
  let component: HouseMobileComponent;
  let fixture: ComponentFixture<HouseMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
