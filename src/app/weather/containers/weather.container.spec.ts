import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherContainer } from './weather.container';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { Reducers } from '../store/reducers/weather.reducer';
import { WeatherForecastState } from '../store/states/WeatherForecastState';
import { SearchWeatherAction } from '../store/actions/search-weather.action';
import { WeatherForcastDataSelector } from '../store/selectors/weather.selector';
import { SearchWeatherSucceedAction } from '../store/actions/search-weather-succeed.action';
import { Weather } from '../../model/weather';

const mockWeather: Weather = {
  city: {
    id: 1,
    name: 'Bedford'
  },
  list: [
    {
      main: {
        temp: 10
      }
    }
  ]
};

describe('WeatherContainer', () => {
  let component: WeatherContainer;
  let fixture: ComponentFixture<WeatherContainer>;
  let store: Store<WeatherForecastState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherContainer ],
      imports: [
        StoreModule.forRoot({
          weather: combineReducers(Reducers)
        })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'select').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the container', () => {
    expect(component).toBeTruthy();
  });

  it('should have invoked the store dispatch with `search weather` action on search button click', () => {
    // Arrange
    const action = new SearchWeatherAction('Bedford');
    // Act
    component.citySearch('Bedford');
    // Assert
    expect(store.dispatch).toHaveBeenCalledWith(action);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should have invoked the store select with `search weather data selector` on container load', () => {
    // Act
    component.ngOnInit();
    // Assert
    expect(store.select).toHaveBeenCalledWith(WeatherForcastDataSelector);
    expect(store.select).toHaveBeenCalledTimes(2);
  });

  it('should get the weather data for search city', (done) => {
    // Arrange
    const successAction = new SearchWeatherSucceedAction(mockWeather);
    // Act
    store.dispatch(successAction);
    component.weatherList$.subscribe(weather => {
      // Assert
      expect(weather).toBeTruthy();
      expect(weather.length).toBe(1);
      expect(weather[0].city.name).toBe(mockWeather.city.name);
      expect(weather[0].city.id).toBe(mockWeather.city.id);
      done();
    });
  });
});
