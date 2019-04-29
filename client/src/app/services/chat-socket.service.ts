import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
import { ChatMessageModel } from '../model/chat-message.model';
import { ChatEvent } from '../model/chat-event';
const SERVER_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ChatSocketService {

  private socket;

  public initSocket(): void {
    this.socket = socketIo('/chat');
  }

  public send(message: ChatMessageModel): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<ChatMessageModel> {
    return new Observable<ChatMessageModel>(observer => {
      this.socket.on('message', (data: ChatMessageModel) => observer.next(data));
    });
  }

  public onEvent(event: ChatEvent): Observable<any> {
    return new Observable<ChatEvent>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
