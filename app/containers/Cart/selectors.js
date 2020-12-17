import { createSelector } from 'reselect';

const selectOutletInfo = state => state.outlet;

const makeSelectCartItems = () =>
  createSelector(
    selectOutletInfo,
    cartState => cartState.get('cartitems'),
  );

const makeSelectOutletInfo = () =>
  createSelector(
    selectOutletInfo,
    cartState => cartState.get('outlet'),
  );

const makeSelectCurrentOutlet = () =>
  createSelector(
    selectOutletInfo,
    cartState => cartState.get('currentOutlet'),
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

export {
  makeSelectError,
  makeSelectSuccess,
  makeSelectCartItems,
  makeSelectOutletInfo,
  makeSelectCurrentOutlet,
};
