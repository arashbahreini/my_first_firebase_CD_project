import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.sass']
})
export class AboutMeComponent implements OnInit {
  @ViewChild('bio') public bio: ElementRef;
  @ViewChild('github') public github: ElementRef;
  @ViewChild('stackoverflow') public stackoverflow: ElementRef;
  public isWithMobile: boolean;

  public routes = [
    {
      route: 'bio',
      isActive: true,
      caption: 'Bio',
      icon: 'fa fa-info-circle'
    },
    {
      route: 'github',
      isActive: false,
      caption: 'Github',
      icon: 'fa fa-github'
    },
    {
      route: 'stackoverflow',
      isActive: false,
      caption: 'Stackoverflow',
      icon: 'fa fa-stack-overflow'
    }
  ];

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    console.log('Page ' + window.pageYOffset);
    console.log('Section ' + this.bio.nativeElement.offsetTop);
    // console.debug("Scroll Event", window.pageYOffset );
    if (window.pageYOffset < this.github.nativeElement.offsetTop - 400) {
      this.activeButton('bio');
    } else if (window.pageYOffset < this.stackoverflow.nativeElement.offsetTop - 400) {
      this.activeButton('github');
    } else {
      this.activeButton('stackoverflow');
    }
  }

  constructor(private commonService: CommonService) {
    this.isWithMobile = commonService.getUserPlatform().isWithMobile;
  }

  activeButton(route: string) {
    this.routes.forEach(element => {
      if (element.route === route) {
        element.isActive = true;
      } else {
        element.isActive = false;
      }
    });
  }

  internalRoute(segmantName: string) {
    this.routes.forEach(element => {
      element.isActive = false;
    });
    this.activeButton(segmantName);

    switch (segmantName) {
      case 'bio':
        this.bio.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
        break;
      case 'github':
        this.github.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
        break;
      case 'stackoverflow':
        this.stackoverflow.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
        break;
      default:
        break;
    }

  }

  ngOnInit() {
  }

}
