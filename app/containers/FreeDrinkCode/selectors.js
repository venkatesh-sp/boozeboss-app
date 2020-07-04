import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the freeDrinkCode state domain
 */

const selectFreeDrinkCodeDomain = state =>
  state.get('freeDrinkCode', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by FreeDrinkCode
 */

const makeSelectFreeDrinkCode = () =>
  createSelector(
    selectFreeDrinkCodeDomain,
    substate => substate.toJS(),
  );

export default makeSelectFreeDrinkCode;
export { selectFreeDrinkCodeDomain };
