export class ChatMessageModel {
  public message: string;
  public owner: string;
  public position?: Position;
}

export enum Position {
  left = 1,
  right = 2,
  center = 3
}
