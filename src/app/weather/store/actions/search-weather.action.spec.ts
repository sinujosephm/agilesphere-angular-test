import { ActionConstants } from '../constants/actions';
import { SearchWeatherAction } from './search-weather.action';

describe('SearchWeatherAction', () => {

    it('should create an action of type `SearchWeather`', () => {
      // Act
      const searchWeatherAction = new SearchWeatherAction('Bedford');

      // Assert
      expect(searchWeatherAction).toBeTruthy();
      expect({...searchWeatherAction}).toEqual({
        type: ActionConstants.SearchWeather,
        payload: 'Bedford'
      });
    });

});
