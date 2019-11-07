import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

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
    {
      route: 'rpi',
      isActive: false,
      caption: 'Raspberry Pie'
    },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    console.log(activatedRoute.snapshot.routeConfig.path);

    const activeRoute = activatedRoute.snapshot.firstChild ? activatedRoute.snapshot.firstChild.routeConfig.path : null;
    if (activeRoute) {
      this.routes.find(x => x.route === activeRoute).isActive = true;
    } else {
      this.routes[0].isActive = true;
    }

    this.router.navigate(['/admin/manage/' + this.routes.find(x => x.isActive).route]);
  }

  ngOnInit() {
  }

  navigateTo(route: string) {
    this.routes.forEach(element => {
      element.isActive = element.route === route;
    });
    this.router.navigate(['/admin/manage/' + route]);
  }
}
