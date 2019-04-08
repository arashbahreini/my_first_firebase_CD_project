import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.sass']
})
export class AboutMeComponent implements OnInit {

  @ViewChild('contact') public contact: ElementRef;
  @ViewChild('bio') public bio: ElementRef;


  public routes = [
    {
      route: 'bio',
      isActive: true,
      caption: 'Bio',
      id: 'bio'
    },
    {
      route: 'contact',
      isActive: false,
      caption: 'Contact',
      id: 'bio'
    }
  ];

  constructor(private router: Router) {

  }

  internalRoute(segmantName: string) {
    this.routes.forEach(element => {
      element.isActive = false;
    });
    this.routes.find(x => x.route === segmantName).isActive = true;

    switch (segmantName) {
      case 'contact':
        this.contact.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
        break;
      case 'bio':
        this.bio.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
        break;
      default:
        break;
    }

  }

  ngOnInit() {
  }

}
