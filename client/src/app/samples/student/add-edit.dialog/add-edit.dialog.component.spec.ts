import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEdit.DialogComponent } from './add-edit.dialog.component';

describe('AddEdit.DialogComponent', () => {
  let component: AddEdit.DialogComponent;
  let fixture: ComponentFixture<AddEdit.DialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEdit.DialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEdit.DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
