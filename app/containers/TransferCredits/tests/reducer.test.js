import { fromJS } from 'immutable';
import transferCreditsReducer from '../reducer';

describe('transferCreditsReducer', () => {
  it('returns the initial state', () => {
    expect(transferCreditsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
