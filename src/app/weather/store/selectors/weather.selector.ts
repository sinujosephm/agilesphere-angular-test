import { createFeatureSelector, createSelector } from '@ngrx/store';

import { WeatherBaseState } from "../states/WeatherBaseState";
import { WeatherForecastState } from "../states/WeatherForecastState";

export const weatherStateFeatureSelector = createFeatureSelector<WeatherBaseState>(
  'weather'
);

export const weatherList = (state: WeatherForecastState) => state.weatherList;

export const WeatherForcastStateSelector = createSelector(
  weatherStateFeatureSelector,
  (state: WeatherBaseState) => {
    return state.weatherForecastState;
  }
);

export const WeatherForcastDataSelector = createSelector(
  WeatherForcastStateSelector,
  weatherList
);
