import { Component, ViewChild, ElementRef, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  city: string;

  @Output()
  public searchCity: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  search() {
    this.searchCity.emit(this.city);
    this.city = '';
  }
}
