import { SearchWeatherAction } from './search-weather.action';
import { SearchWeatherFailureAction } from './search-weather-failure.action';
import { SearchWeatherSucceedAction } from './search-weather-succeed.action';

export type WeatherAction = SearchWeatherAction | SearchWeatherFailureAction | SearchWeatherSucceedAction;
