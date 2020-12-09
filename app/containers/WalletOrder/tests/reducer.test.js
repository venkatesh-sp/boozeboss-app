import { fromJS } from 'immutable';
import walletOrderReducer from '../reducer';

describe('walletOrderReducer', () => {
  it('returns the initial state', () => {
    expect(walletOrderReducer(undefined, {})).toEqual(fromJS({}));
  });
});
