import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { StudentComponent } from './student.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AngularFireDatabaseModule, AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentModule } from './student.module';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { StudentModel } from 'src/app/model/student.model';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  let h5: HTMLElement;
  let dialogSpy: jasmine.Spy;
  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

  const deletDialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        MaterialModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        BrowserAnimationsModule,
        StudentModule],
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
    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    h5 = fixture.nativeElement.querySelector('h5');
  });

  beforeEach(() => {
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
  });

  it('should show approrpriate header. ', () => {
    expect(h5.textContent).toEqual('Description about this page');
  });

  it('Should open and close Add/Edit dialog', () => {
    component.openAddEditDialog();
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it('Should open Delete dialog on fire the function', () => {
    component.delete(new StudentModel());
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });
});
