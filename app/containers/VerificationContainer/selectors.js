import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the verificationContainer state domain
 */

const selectVerificationContainerDomain = state =>
  state.verificationContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by VerificationContainer
 */

const makeSelectVerificationContainer = () =>
  createSelector(
    selectVerificationContainerDomain,
    substate => substate,
  );

export default makeSelectVerificationContainer;
export { selectVerificationContainerDomain };
