import { Action } from '@ngrx/store';
import { ActionConstants } from '../constants/actions';

export class SearchWeatherAction implements Action {
  readonly type = ActionConstants.SearchWeather;
  constructor(public payload: string) {}
}
