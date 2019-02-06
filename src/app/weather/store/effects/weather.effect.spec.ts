import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { WeatherService } from '../../services/weather.service';
import { WeatherEffect } from './weather.effect';
import { Weather } from '../../../model/weather';
import { SearchWeatherAction } from '../actions/search-weather.action';
import { SearchWeatherSucceedAction } from '../actions/search-weather-succeed.action';

class MockActionsService extends Actions {
  source: any;
  constructor() {
    super(empty());
  }

  set setSource(source: Observable<any>) {
    this.source = source;
  }
}

let mockActions$: MockActionsService;
let service: WeatherService;
let effect: WeatherEffect;

const mockWeather: Weather = {
  city: {
    id: 1,
    name: 'Bedford'
  },
  list: [{
    main: {
      temp: 10
    }
  }]
};

describe('WeatherEffect', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        WeatherService,
        WeatherEffect,
        { provide: Actions, useFactory: () => new MockActionsService() },
      ],
    });

    mockActions$ = TestBed.get(Actions);
    service = TestBed.get(WeatherService);
    effect = TestBed.get(WeatherEffect);
    spyOn(service, 'searchWeatherForCity').and.returnValue(of(mockWeather));
  });

  describe('While Searching weather For a Valid City', () => {
    it('should return the weather forecast for Bedford', () => {
      // Arrange
      const searchWeatherAction = new SearchWeatherAction('Bedford');
      const searchWeatherSucceedAction = new SearchWeatherSucceedAction(mockWeather);
      mockActions$.setSource = hot('-a', { a: searchWeatherAction });
      const expectedSucceedAction$ = cold('-b', { b: searchWeatherSucceedAction });

      // Act
      const weatherForecastResult$ = effect.getWeatherForcast$;

      // Assert
      expect(weatherForecastResult$).toBeTruthy();
      expect(weatherForecastResult$).toBeObservable(expectedSucceedAction$);
    });
  });
});
