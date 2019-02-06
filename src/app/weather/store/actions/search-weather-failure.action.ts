import { Action } from '@ngrx/store';
import { ActionConstants } from '../constants/actions';

export class SearchWeatherFailureAction implements Action {
  readonly type = ActionConstants.SearchWeatherFailure;
  constructor(public payload: any) {}
}
