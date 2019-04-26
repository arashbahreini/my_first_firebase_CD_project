import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/user.model';
import { ResultModel } from 'src/app/model/result.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public user: UserModel = new UserModel();
  public loginResult: ResultModel<any> = new ResultModel<any>();

  constructor(
    private authenticationService: AuthenticationService,
    private routes: Router) { }

  ngOnInit() {
  }

  login() {
    this.loginResult.isLoading = true;
    this.authenticationService.login(this.user).subscribe((res) => {
      this.routes.navigate(['./admin']);
    }, (error) => {
      this.loginResult.setError(error);
    });
  }
}