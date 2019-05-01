import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from '../home/login/login.component';
import { FormsModule } from '@angular/forms';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let a: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent, LoginComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          { path: 'home/login', component: LoginComponent }
        ])],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    a = fixture.nativeElement.querySelector('a');
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => fixture.detectChanges());
  });

  it('should create show Site tab in the menu', () => {
    expect(a.textContent).toEqual('Site(current)');
  });

  it('Should navigate on log out .', () => {
    component.exit();
    expect(localStorage.getItem('currentUser')).toBe(null);
  });
});
