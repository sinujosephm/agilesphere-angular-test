import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Weather } from '../../model/weather';
import { Store } from '@ngrx/store';
import { WeatherBaseState } from '../store/states/WeatherBaseState';
import { WeatherForcastDataSelector } from '../store/selectors/weather.selector';
import { SearchWeatherAction } from '../store/actions/search-weather.action';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line:component-class-suffix
export class WeatherContainer implements OnInit {
  weatherList$: Observable<Weather[]>;

  ngOnInit(): void {
    this.weatherList$ = this.store.select(WeatherForcastDataSelector);
  }

  constructor(private store: Store<WeatherBaseState>) {}

  citySearch(city: string) {
    this.store.dispatch(new SearchWeatherAction(city));
  }
}
