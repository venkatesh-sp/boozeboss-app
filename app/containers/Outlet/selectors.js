import { createSelector } from 'reselect';

const selectOutletInfo = state => state.outlet;

const makeSelectOutletInfo = () =>
  createSelector(
    selectOutletInfo,
    outletState => outletState.get('outlet'),
  );

const makeSelectError = () =>
  createSelector(
    selectOutletInfo,
    outletState => outletState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(
    selectOutletInfo,
    outletState => outletState.get('success'),
  );

export { makeSelectError, makeSelectSuccess, makeSelectOutletInfo };
