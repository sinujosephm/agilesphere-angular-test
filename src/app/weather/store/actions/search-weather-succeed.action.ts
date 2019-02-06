import { Action } from '@ngrx/store';
import { ActionConstants } from '../constants/actions';
import { Weather } from '../../../model/weather';

export class SearchWeatherSucceedAction implements Action {
  readonly type = ActionConstants.SearchWeatherSucceed;
  constructor(public payload: Weather) {}
}
