import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  public getGithubEvents(): Observable<any> {
    return this.http.get<any>('https://api.github.com/users/arashbahreini/events');
  }

  public getStackAnswers(): Observable<any> {
    return this.http
      .get<any>('https://api.stackexchange.com/2.2/users/3773888/answers?page=1&pagesize=5&order=desc&sort=votes&site=stackoverflow');
  }

  public getStackQuestions(): Observable<any> {
    return this.http
      .get<any>('https://api.stackexchange.com/2.2/users/3773888/questions?page=1&pagesize=5&order=desc&sort=votes&site=stackoverflow');
  }
}
