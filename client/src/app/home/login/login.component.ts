import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/user.model';
import { ResultModel } from 'src/app/model/result.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public isWithMobile: boolean;
  public user: UserModel = new UserModel();
  public loginResult: ResultModel<any> = new ResultModel<any>();

  constructor(
    private authenticationService: AuthenticationService,
    private routes: Router,
    private commonService: CommonService) {
    this.isWithMobile = commonService.getUserPlatform().isWithMobile;
  }

  ngOnInit() {
  }

  login() {
    this.loginResult.isLoading = true;
    this.authenticationService.login(this.user).subscribe((res) => {
      this.routes.navigate(['./admin']);
    }, (error) => {
      if (error.status === 500) {
        this.loginResult.setError('Server error!!!');
      } else {
        this.loginResult.setError(error);
      }
    });
  }
}
