import { ActionConstants } from '../constants/actions';
import { SearchWeatherSucceedAction } from './search-weather-succeed.action';
import { Weather } from '../../../model/weather';

describe('SearchWeatherSucceedAction', () => {
    it('should create an action of type `SearchWeatherSucceedAction`', () => {
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
      const expectedSuccessPayload: Weather = {
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

      // Act
      const searchWeatherSucceedAction = new SearchWeatherSucceedAction(sucessPayload);

      // Assert
      expect(searchWeatherSucceedAction).toBeTruthy();
      expect({...searchWeatherSucceedAction}).toEqual({
        type: ActionConstants.SearchWeatherSucceed,
        payload: expectedSuccessPayload
      });
    });
});
