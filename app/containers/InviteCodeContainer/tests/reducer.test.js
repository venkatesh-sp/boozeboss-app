import { fromJS } from 'immutable';
import inviteCodeContainerReducer from '../reducer';

describe('inviteCodeContainerReducer', () => {
  it('returns the initial state', () => {
    expect(inviteCodeContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
