import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from 'src/app/services/user.service';
import { of, Observable } from 'rxjs';
import { throwError } from 'rxjs';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let h3: HTMLElement;
  let userComponent;
  let userService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [HttpClientTestingModule],
      providers: [UserService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    h3 = fixture.nativeElement.querySelector('h3');
  });

  beforeEach(inject([UserService], (s: any) => {
    userService = s;
    fixture = TestBed.createComponent(UsersComponent);
    userComponent = fixture.componentInstance;
  }));

  it('Should have header', () => {
    expect(h3.textContent).toEqual(' User management ');
  });

  it('Should call getUsers and return list of users', async(() => {
    const users = [{ name: 'arash' }];
    spyOn(userService, 'getUsers').and.returnValue(of(users));
    userComponent.getUsers();
    fixture.detectChanges();
    expect(userComponent.users.data).toEqual(users);
  }));

  it('Should set Error on failure of calling GetUser() method.', async(() => {
    const users = [{ name: 'arash' }];
    const errorMessage = 'I am error';
    spyOn(userService, 'getUsers').and.returnValue(throwError(errorMessage));
    userComponent.getUsers();
    fixture.detectChanges();
    expect(userComponent.users.errorMessage).toEqual(errorMessage);
  }));

  it('Should fill users from service', () => {
    component.users.setData([{
      name: 'arash'
    }]);
    expect(component.users.isLoading).toEqual(false);
  });

  it('Should set error for users from service', () => {
    component.users.setError('I am error.');
    expect(component.users.errorMessage).toEqual('I am error.');
  });
});
