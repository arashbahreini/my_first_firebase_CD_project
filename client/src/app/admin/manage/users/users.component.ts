import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ResultModel } from 'src/app/model/result.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  public users: ResultModel<any> = new ResultModel<any>();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.users.load();
    this.userService.getUsers().subscribe(
      (res: any) => {
        this.users.setData(res);
      }, (error: any) => {
        this.users.setError(error);
      }
    );
  }
}
