import { ActionConstants } from '../constants/actions';
import { SearchWeatherFailureAction } from './search-weather-failure.action';

describe('SearchWeatherFailedAction', () => {

    it('should create an action of type `SearchWeatherFailed`', () => {
      // Arrange
      const failurePayload = { body: 'Some Error Occured'};
      const expectedFailurePayload = { body: 'Some Error Occured'};

      // Act
      const searchWeatherFailedAction = new SearchWeatherFailureAction(failurePayload);

      // Assert
      expect(searchWeatherFailedAction).toBeTruthy();
      expect({...searchWeatherFailedAction}).toEqual({
        type: ActionConstants.SearchWeatherFailure,
        payload: expectedFailurePayload
      });
    });
});
