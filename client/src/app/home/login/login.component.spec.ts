import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Location } from '@angular/common';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { throwError, of } from 'rxjs';
import { AdminComponent } from 'src/app/admin/admin.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let btn: HTMLElement;
  let loginService;
  let loginComponent;
  let location: Location;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, AdminComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'admin', component: AdminComponent}
        ])],
      providers: [AuthenticationService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    btn = fixture.nativeElement.querySelector('button');
  });

  beforeEach(inject([AuthenticationService], (s: any) => {
    loginService = s;
    fixture = TestBed.createComponent(LoginComponent);
    loginComponent = fixture.componentInstance;
    location = TestBed.get(Location);
  }));

  it('Should faild in login and return acceptable value', async(() => {
    spyOn(loginService, 'login').and.returnValue(throwError('error'));
    loginComponent.login();
    expect(loginComponent.loginResult.errorMessage).toEqual('error');
  }));

  it('Should login and navigate', async(() => {
    spyOn(loginService, 'login').and.returnValue(of({}));
    loginComponent.login();
    expect(location.path()).toBe('');
  }));

  it('should show login button', () => {
    expect(btn.textContent).toEqual('Login');
  });
});
