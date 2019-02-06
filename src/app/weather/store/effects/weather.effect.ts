import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { WeatherService } from '../../services/weather.service';

import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ActionConstants } from '../constants/actions';
import { SearchWeatherAction } from '../actions/search-weather.action';
import { SearchWeatherSucceedAction } from '../actions/search-weather-succeed.action';
import { SearchWeatherFailureAction } from '../actions/search-weather-failure.action';

@Injectable()
export class WeatherEffect {
  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}

  @Effect()
  getWeatherForcast$ = this.actions$.ofType(ActionConstants.SearchWeather).pipe(
    map((action: SearchWeatherAction ) => action.payload),
      switchMap(cityName => {
      return this.weatherService
        .searchWeatherForCity(cityName)
        .pipe(
          map(weather => new SearchWeatherSucceedAction(weather)),
          catchError(error => of(new SearchWeatherFailureAction(error)))
        );
    })
  );
}
