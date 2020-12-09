import { fromJS } from 'immutable';
import qrScannerReducer from '../reducer';

describe('qrScannerReducer', () => {
  it('returns the initial state', () => {
    expect(qrScannerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
