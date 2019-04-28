import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked, AfterContentInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatUserDialogComponent } from './user/chat-user-dialog.component';
import { ChatUserModel } from 'src/app/model/chat-user.model';
import { ChatMessageModel, Position } from 'src/app/model/chat-message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  public user: ChatUserModel = new ChatUserModel();
  public messages: ChatMessageModel[] = [];
  public message: ChatMessageModel = new ChatMessageModel();

  ngOnInit() {
    setTimeout(() => {
      this.openUserDialog();
    }, 10);
  }

  openUserDialog() {
    const dialog = this.dialog.open(ChatUserDialogComponent, {
      disableClose: false,
    });

    dialog.afterClosed().subscribe(res => {
      this.user.name = res ? res : 'Guest';
      this.messages.push({
        message: `Welcome ${this.user.name} to the Chatbox.`,
        owner: '',
        position: Position.center
      });
    });
  }

  addMessage(message: ChatMessageModel) {
    if (!message.message) {
      return;
    }
    message.owner = this.user.name;
    this.messages.push(message);
    this.message.position = Position.left;
    this.message = new ChatMessageModel();
  }
}
