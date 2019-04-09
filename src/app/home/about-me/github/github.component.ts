import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.sass']
})
export class GithubComponent implements OnInit {

  public githubData: any[] = [];

  constructor(private githubService: GithubService) { }

  ngOnInit() {
    this.getGithubData();
    console.log(this.githubData);

  }

  getGithubData() {
    this.githubData = [];
    this.githubService.getGithubEvents().subscribe((res: any) => {
      res.forEach(element => {
        if (element.payload.commits) {
          element.payload.commits.forEach(commit => {
            if (this.githubData.length < 10) {
              this.githubData.push({
                date: element.created_at,
                repositoryName: element.repo.name.substr(14),
                repositoryUrl: element.repo.url,
                commitMessage: commit.message,
                commitLink: 'https://github.com/' + element.repo.name + '/commit/' + commit.sha
              });
            }
          });
        }
      });
    }, (error: any) => { });
  }

}
