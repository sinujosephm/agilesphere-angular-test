import { TestBed, inject } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { of } from 'rxjs/observable/of';
import { Weather } from '../../model/weather';

const weather: Weather = {
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

describe('WeatherService', () => {
  beforeEach(() => {
    const mockWeatherService: Partial<WeatherService> = {
      searchWeatherForCity: (city: string) => of(weather)
    };
    spyOn(mockWeatherService, 'searchWeatherForCity').and.callThrough();
    TestBed.configureTestingModule({
      providers: [
        { provide: WeatherService, useValue: mockWeatherService}
      ]
    });
  });

  it('should create the weather service', inject([WeatherService], (service: WeatherService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the weather information', inject([WeatherService], (service: WeatherService) => {
    // Act
    service.searchWeatherForCity('Bedford')
      .subscribe(result => {
        // Assert
        expect(result).toBe(weather);
        expect(result.city.name).toBe('Bedford');
        expect(result.city.id).toBe(1);
        expect(result.list[0]).toBeTruthy();
        expect(result.list[0].main.temp).toBe(10);
    });
  }));
});
