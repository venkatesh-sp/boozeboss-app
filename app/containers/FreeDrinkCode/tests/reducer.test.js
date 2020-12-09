import { fromJS } from 'immutable';
import freeDrinkCodeReducer from '../reducer';

describe('freeDrinkCodeReducer', () => {
  it('returns the initial state', () => {
    expect(freeDrinkCodeReducer(undefined, {})).toEqual(fromJS({}));
  });
});
