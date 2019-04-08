import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public showFixedNav: boolean;
  public routes = [
    {
      route: 'about-me',
      isActive: true,
      caption: 'About me'
    },
    {
      route: 'house',
      isActive: false,
      caption: 'House'
    },
    {
      route: '../admin',
      isActive: false,
      caption: 'Admin'
    }
  ];


  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    console.log($event);
    console.log(window.pageYOffset);
    if (window.pageYOffset > 0) {
      this.showFixedNav = true;
    } else {
      this.showFixedNav = false;
    }
  }

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
