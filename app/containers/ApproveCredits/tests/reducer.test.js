import { fromJS } from 'immutable';
import approveCreditsReducer from '../reducer';

describe('approveCreditsReducer', () => {
  it('returns the initial state', () => {
    expect(approveCreditsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
