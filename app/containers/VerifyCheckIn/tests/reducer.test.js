import { fromJS } from 'immutable';
import verifyCheckInReducer from '../reducer';

describe('verifyCheckInReducer', () => {
  it('returns the initial state', () => {
    expect(verifyCheckInReducer(undefined, {})).toEqual(fromJS({}));
  });
});
