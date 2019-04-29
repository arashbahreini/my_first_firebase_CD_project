import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked, AfterContentInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatUserDialogComponent } from './user/chat-user-dialog.component';
import { ChatUserModel } from 'src/app/model/chat-user.model';
import { ChatMessageModel, Position } from 'src/app/model/chat-message.model';
import { ChatSocketService } from 'src/app/services/chat-socket.service';
import { ChatEvent } from 'src/app/model/chat-event';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit {

  constructor(private dialog: MatDialog, private chatSocketService: ChatSocketService) { }

  public user: ChatUserModel = new ChatUserModel();
  public messages: ChatMessageModel[] = [];
  public message: ChatMessageModel = new ChatMessageModel();
  ioConnection: any;

  ngOnInit() {
    setTimeout(() => {
      this.openUserDialog();
    }, 10);
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.chatSocketService.initSocket();

    this.ioConnection = this.chatSocketService.onMessage()
      .subscribe((message: ChatMessageModel) => {
        this.messages.push(message);
      });


    this.chatSocketService.onEvent(ChatEvent.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });

    this.chatSocketService.onEvent(ChatEvent.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  public sendMessage(sentMessage: string): void {
    if (!sentMessage) {
      return;
    }

    this.chatSocketService.send({
      owner: this.user.name,
      message: sentMessage
    });
    this.chatSocketService = null;
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
