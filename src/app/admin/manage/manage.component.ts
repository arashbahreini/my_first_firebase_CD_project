import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.sass']
})
export class ManageComponent implements OnInit {


  public routes = [
    {
      route: 'users',
      isActive: false,
      caption: 'Users'
    },
  ];

  constructor(private router: Router) {
    router.events.subscribe(e => {
      this.routes.forEach(x => {
        if (this.router.url.search(x.route) >= 0) {
          x.isActive = true;
        } else {
          x.isActive = false;
        }
      });
    });
  }

  ngOnInit() {
  }

}
