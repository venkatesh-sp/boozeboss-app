import { fromJS } from 'immutable';
import approveFreeDrinkReducer from '../reducer';

describe('approveFreeDrinkReducer', () => {
  it('returns the initial state', () => {
    expect(approveFreeDrinkReducer(undefined, {})).toEqual(fromJS({}));
  });
});
