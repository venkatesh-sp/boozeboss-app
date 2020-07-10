import { fromJS } from 'immutable';
import actionsContainerReducer from '../reducer';

describe('actionsContainerReducer', () => {
  it('returns the initial state', () => {
    expect(actionsContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
