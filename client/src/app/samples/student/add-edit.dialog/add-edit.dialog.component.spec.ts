import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditDialogComponent } from './add-edit.dialog.component';
import { StudentModule } from '../student.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentModel } from 'src/app/model/student.model';

describe('AddEdit.DialogComponent', () => {
  let component: AddEditDialogComponent;
  let fixture: ComponentFixture<AddEditDialogComponent>;
  let h1: HTMLElement;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        StudentModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: null
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDialogComponent);
    component = fixture.componentInstance;
    h1 = fixture.nativeElement.querySelector('h1');
  });

  it('Should create appropriate header.', () => {
    fixture.detectChanges();
    expect(h1.textContent).toEqual('Add - Edit Student');
  });

  it('Should pass the condition in init function', () => {
    const currentDate = new Date();
    component.data = new StudentModel();
    component.data.dateOfBirth = new Date();
    component.data.key = '111';
    component.data.firstName = '111';
    component.data.lastName = '111';
    component.data.age = 11;
    component.data.grade = '111';
    component.data.address = {
      city: '111',
      street: '111'
    };
    component.data.workEligible = true;
    component.data.dateOfBirth = new Date(currentDate);

    fixture.detectChanges();
    expect(component.data.dateOfBirth).toEqual(currentDate);
    expect(component.studentForm.value.key).toEqual(component.data.key);
  });

  it('Should close dialog on click', () => {
    component.closeDialog();
    fixture.detectChanges();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
