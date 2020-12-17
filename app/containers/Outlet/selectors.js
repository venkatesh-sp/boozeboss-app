import { createSelector } from 'reselect';

const selectOutletInfo = state => state.outlet;

const makeSelectOutletInfo = () =>
  createSelector(
    selectOutletInfo,
    outletState => outletState.get('outlet'),
  );
const makeSelectCartItems = () =>
  createSelector(
    selectOutletInfo,
    outletState => outletState.get('cartitems'),
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

const makeSelectCurrentOutlet = () =>
  createSelector(
    selectOutletInfo,
    outletState => outletState.get('currentOutlet'),
  );

export {
  makeSelectError,
  makeSelectSuccess,
  makeSelectOutletInfo,
  makeSelectCartItems,
  makeSelectCurrentOutlet,
};
