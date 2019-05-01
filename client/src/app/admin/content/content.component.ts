import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent implements OnInit {

  public routes = [
    {
      route: 'plant',
      isActive: false,
      caption: 'Plant'
    },
    {
      route: 'temperature',
      isActive: false,
      caption: 'Temperature'
    }
  ];

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.router.events.subscribe(e => {
      this.routes.forEach(x => {
        if (this.router.url.search(x.route) >= 0) {
          x.isActive = true;
        } else {
          x.isActive = false;
        }
      });
    });
  }
}
