import { ResultModel } from './result.model';

export class LogModel {
  public id: string;
  public browser: string;
  public date: Date;
  public browserVersion: string;
  public os: string;
  public device: string;
  public osVersion: string;
  public ip: string;
  public country?: ResultModel<string>;
  public city?: ResultModel<string>;

  constructor() {
    this.country = new ResultModel<string>();
    this.city = new ResultModel<string>();
  }
}
