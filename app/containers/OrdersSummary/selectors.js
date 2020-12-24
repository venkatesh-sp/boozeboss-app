import { createSelector } from 'reselect';

const selectOutletInfo = state => state.summary;

const makeSelectOrdersSummary = () =>
  createSelector(
    selectOutletInfo,
    orders => orders.get('items'),
  );

const makeSelectError = () =>
  createSelector(
    selectOutletInfo,
    cartState => cartState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(
    selectOutletInfo,
    cartState => cartState.get('success'),
  );

export { makeSelectSuccess, makeSelectError, makeSelectOrdersSummary };
