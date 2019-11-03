import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.sass']
})
export class HouseComponent implements OnInit {

  isWithMobile: boolean;

  constructor(private commonService: CommonService) {
  }

  ngOnInit() {
    this.isWithMobile = this.commonService.getUserPlatform().isWithMobile;
  }
}
