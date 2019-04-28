import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatUserDialogComponent } from './chat-user-dialog.component';


describe('UserComponent', () => {
  let component: ChatUserDialogComponent;
  let fixture: ComponentFixture<ChatUserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatUserDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
