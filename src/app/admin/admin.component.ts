import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private routes: Router) { }

  ngOnInit() {
  }

  exit() {
    this.authenticationService.logout();
    this.routes.navigate(['./home/login']);
  }
}
