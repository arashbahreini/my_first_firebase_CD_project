import { GithubService } from 'src/app/services/github.service';
import { Component, OnInit } from '@angular/core';
import { debug } from 'util';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-stackoverflow',
  templateUrl: './stackoverflow.component.html',
  styleUrls: ['./stackoverflow.component.sass']
})
export class StackoverflowComponent implements OnInit {

  public stackData: any[] = [];
  public isLoading: boolean;
  public showAnswers: boolean;
  public isWithMobile: boolean;

  constructor(
    private githubService: GithubService,
    private commonService: CommonService) {
    this.isWithMobile = commonService.getUserPlatform().isWithMobile;
  }

  ngOnInit() {
    this.getAnswers();
    this.showAnswers = true;
  }

  onShowAnswers() {
    if (this.showAnswers === true) {
      return;
    }
    this.showAnswers = true;
    this.getAnswers();
  }

  onShowQuestions() {
    if (this.showAnswers === false) {
      return;
    }
    this.showAnswers = false;
    this.getQuestions();
  }

  getQuestions() {
    this.isLoading = true;
    this.stackData = [];
    this.githubService.getStackQuestions().subscribe(
      (res: any) => {
        res.items.forEach(element => {
          this.stackData.push({
            score: element.score,
            link: 'https://stackoverflow.com/a/ ' + element.answer_id + '/3773888',
            date: element.creation_date
          });
        });
        console.log(this.stackData);
        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
      }
    );
  }

  getAnswers() {
    this.isLoading = true;
    this.stackData = [];
    this.githubService.getStackAnswers().subscribe(
      (res: any) => {
        res.items.forEach(element => {
          this.stackData.push({
            isAccepted: element.is_accepted,
            score: element.score,
            link: 'https://stackoverflow.com/questions/25683455/sql-server-trying-to-create-view-inside-a-stored-procedure',
            date: element.creation_date
          });
        });
        this.isLoading = false;
        console.log(this.stackData);

      }, (error: any) => {
        this.isLoading = false;

      }
    );
  }

}
