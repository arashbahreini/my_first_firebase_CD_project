import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageComponent } from './manage.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManageComponent', () => {
  let component: ManageComponent;
  let fixture: ComponentFixture<ManageComponent>;
  let a: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    a = fixture.nativeElement.querySelector('a');
  });

  it('Should show user menu', () => {
    expect(a.textContent).toEqual('Users');
  });
});
