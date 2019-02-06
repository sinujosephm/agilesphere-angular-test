import { Weather } from '../../../model/weather';
import { Reducers } from '../reducers/weather.reducer';
import { WeatherForecastState } from "../states/WeatherForecastState";
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { WeatherForcastStateSelector, WeatherForcastDataSelector } from './weather.selector';
import { SearchWeatherSucceedAction } from '../actions/search-weather-succeed.action';

describe('WeatherSelector', () => {
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

  let weatherStore: Store<WeatherForecastState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          weather: combineReducers(Reducers)
        })
      ],
    });
    weatherStore = TestBed.get(Store);
  });

  describe('While selecting state selector using store', () => {
    it('should get the weather state', (done) => {
      // Act
      weatherStore.dispatch(new SearchWeatherSucceedAction(mockWeather));
      weatherStore.select(WeatherForcastStateSelector)
      .subscribe(result => {
          // Assert
          expect(result).toBeTruthy();
          expect(result.weatherList.length).toBe(1);
          expect(result.weatherList[0].city.name).toBe('Bedford');
          expect(result.weatherList[0].city.id).toBe(1);
          expect(result.weatherList[0].list[0].main.temp).toBe(10);
          done();
        });
      });
    });

  describe('While selecting weather data selector using store', () => {
    it('should get the weather information of Bedford city', (done) => {
      // Act
      weatherStore.dispatch(new SearchWeatherSucceedAction(mockWeather));
      weatherStore.select(WeatherForcastDataSelector)
      .subscribe(result => {
          // Assert
          expect(result).toBeTruthy();
          expect(result.length).toBe(1);
          expect(result[0].city.name).toBe('Bedford');
          expect(result[0].city.id).toBe(1);
          expect(result[0].list[0].main.temp).toBe(10);
          done();
        });
    });
  });
});
