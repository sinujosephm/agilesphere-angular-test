import { Weather } from '../../../model/weather';
import { WeatherAction } from '../actions/weather.action';
import { ActionConstants } from '../constants/actions';
import { ActionReducerMap } from '@ngrx/store';
import { WeatherForecastState } from '../states/WeatherForecastState';
import { WeatherBaseState } from '../states/WeatherBaseState';

export const Reducers: ActionReducerMap<WeatherBaseState> = {
  weatherForecastState: WeatherReducer
};

export const InitialWeatherForecastState: WeatherForecastState = {
  weatherList: []
};

export function WeatherReducer(
  state = InitialWeatherForecastState,
  action: WeatherAction
): WeatherForecastState {

  switch (action.type) {
    case ActionConstants.SearchWeather: {
      return {
        ...state
      };
    }

    case ActionConstants.SearchWeatherSucceed: {

      if (checkIfWeatherAlreadyExistsInTheList(state, action.payload)) {
        return {
          ...state
        };
      }

      const weatherList = [...state.weatherList, action.payload];
      return {
        ...state,
        weatherList
      };
    }

    case ActionConstants.SearchWeatherFailure: {
      return {
        ...state
      };
    }
  }

  return state;
}

export function checkIfWeatherAlreadyExistsInTheList(state: WeatherForecastState, weather: Weather): boolean {
  return state.weatherList.some(
    w => w.city.id === weather.city.id
  );
}
