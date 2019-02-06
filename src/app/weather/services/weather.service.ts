import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { Weather, City, Forecast, WeatherList } from '../../model/weather';
import { of } from 'rxjs/observable/of';

@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) { }

  searchWeatherForCity(city: string): Observable<Weather> {

    const url =  'https://api.openweathermap.org/data/2.5/forecast' +
                 '?cnt=8&q=' + encodeURIComponent(city) +
                 '&units=metric' +
                 '&appid=010721642521f31b0fbc8c3831d45951';

    return this.http.get(url).pipe(
      map((data) => this.transformDataToWeather(data))
    );
  }

  private transformDataToWeather(data: any): Weather {
    const city: City = {
      id: data.city.id,
      name: data.city.name
    };

    const weatherList: WeatherList[] = [];
    data.list.forEach(item => {
      const forecast: Forecast = {
        temp: item.main.temp
      };
      weatherList.push({
        main: forecast,
        dt_txt: item.dt_txt
      });
    });

    return {
      city: city,
      list: weatherList
    };
  }

}
