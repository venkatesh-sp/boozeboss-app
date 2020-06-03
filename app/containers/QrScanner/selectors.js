import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the qrScanner state domain
 */

const selectQrScannerDomain = state => state.get('qrScanner', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by QrScanner
 */

const makeSelectQrScanner = () =>
  createSelector(
    selectQrScannerDomain,
    substate => substate.toJS(),
  );

export default makeSelectQrScanner;
export { selectQrScannerDomain };
