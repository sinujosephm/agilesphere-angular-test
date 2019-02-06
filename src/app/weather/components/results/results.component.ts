import {Component, OnChanges, ChangeDetectionStrategy, Input } from '@angular/core';
import { Weather } from '../../../model/weather';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsComponent implements OnChanges {
  @Input()
  public weatherList: Weather[];

  constructor() { }

  ngOnChanges() {
    // IMPLEMENT ANYTHING YOU BEKIEVE YOU MIGHT NEED HERE
  }
}


