import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-search-value',
  templateUrl: './search-value.component.html',
  styleUrls: ['./search-value.component.sass']
})
export class SearchValueComponent implements OnChanges {

  @Input() value: any;
  @Input() searchValue: string;
  public htmlValue: string;
  constructor() {
  }

  ngOnChanges() {
    this.value = this.value.toString().toLowerCase();
    const inner = this.value.replace(this.searchValue.toLowerCase(), `<span class="highLight">${this.searchValue.toLowerCase()}</span>`);
    this.htmlValue = inner;
  }
}
