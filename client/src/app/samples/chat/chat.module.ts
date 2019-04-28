import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ChatUserDialogComponent } from './user/chat-user-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChatComponent, ChatUserDialogComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MaterialModule,
    FormsModule,
  ], entryComponents: [ChatUserDialogComponent]
})
export class ChatModule { }
