import { fromJS } from 'immutable';
import addCreditsReducer from '../reducer';

describe('addCreditsReducer', () => {
  it('returns the initial state', () => {
    expect(addCreditsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
