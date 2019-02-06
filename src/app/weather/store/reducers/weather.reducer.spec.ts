import { WeatherReducer, InitialWeatherForecastState } from './weather.reducer';
import { SearchWeatherAction } from '../actions/search-weather.action';
import { Weather } from '../../../model/weather';
import { SearchWeatherSucceedAction } from '../actions/search-weather-succeed.action';
import { SearchWeatherFailureAction } from '../actions/search-weather-failure.action';

describe('Weather reducer function', () => {

  describe('When no action is made', () => {

    it('should default to initial weather forecast state', () => {
      // Arrange
      const action = {} as any;
      // Act
      const state = WeatherReducer(undefined, action);
      // Assert
      expect(state).toBeTruthy();
      expect(state).toBe(InitialWeatherForecastState);
    });
  });

  describe('When search weather action is requested', () => {
    it('should have a truthy loading of the state', () => {
      // Arrange
      const action = new SearchWeatherAction('Bedford');
      // Act
      const state = WeatherReducer(InitialWeatherForecastState, action);
      // Assert
      expect(state).toBeTruthy();
      expect(state.weatherList.length).toBe(0);
    });
  });

  describe('When search weather action is successfully completed', () => {
    it('should get weather od Bedford city', () => {
      // Arrange
      const sucessPayload: Weather = {
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
      const action = new SearchWeatherSucceedAction(sucessPayload);

      // Act
      const state = WeatherReducer(InitialWeatherForecastState, action);

      // Assert
      expect(state).toBeTruthy();
      expect(state.weatherList.length).toBe(1);
      expect(state.weatherList[0]).toBe(sucessPayload);
    });
  });

  describe('When search weather action failed due to some error', () => {
    it('should maintain initial state', () => {
      // Arrange
      const failurePayload = {
        body: 'Error occured'
      };
      const action = new SearchWeatherFailureAction(failurePayload);

      // Act
      const state = WeatherReducer(InitialWeatherForecastState, action);

      // Assert
      expect(state).toBeTruthy();
      expect(state).toEqual(InitialWeatherForecastState);
    });
  });
});
