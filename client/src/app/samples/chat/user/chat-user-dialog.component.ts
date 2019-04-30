import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-user-dialog',
  templateUrl: './chat-user-dialog.component.html',
  styleUrls: ['./chat-user-dialog.component.sass']
})
export class ChatUserDialogComponent implements OnInit {

  public name: string;
  constructor(public dialog: MatDialogRef<ChatUserDialogComponent>) { }

  ngOnInit() {
  }

}
