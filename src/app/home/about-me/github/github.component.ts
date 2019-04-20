import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.sass']
})
export class GithubComponent implements OnInit {

  public githubData: any[] = [];
  public isLoading: boolean;
  public isWithMobile: boolean;

  constructor(
    private githubService: GithubService,
    private commonService: CommonService) {
      this.isWithMobile = commonService.getUserPlatform().isWithMobile;
    }

  ngOnInit() {
    this.getGithubData();
  }

  getGithubData() {
    this.isLoading = true;
    this.githubData = [];
    this.githubService.getGithubEvents().subscribe((res: any) => {
      res.forEach(element => {
        if (element.payload.commits) {
          element.payload.commits.forEach(commit => {
            if (this.githubData.length < 5) {
              this.githubData.push({
                date: element.created_at,
                repositoryName: element.repo.name.substr(14),
                repositoryUrl: 'https://github.com/' + element.repo.name,
                commitMessage: commit.message,
                commitLink: 'https://github.com/' + element.repo.name + '/commit/' + commit.sha
              });
            }
          });
        }
        this.isLoading = false;
      });
    }, (error: any) => {
      this.isLoading = false;
    });
  }

}
