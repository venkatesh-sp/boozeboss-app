import { createSelector } from 'reselect';

const selectOutletInfo = state => state.outlet;

const selectGlobal = state => state.global;

const makeSelectCartItems = () =>
  createSelector(
    selectOutletInfo,
    cartState => cartState.get('cartitems'),
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

const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('user'),
  );

export {
  makeSelectSuccess,
  makeSelectError,
  makeSelectCartItems,
  makeSelectOutletInfo,
  makeSelectCurrentOutlet,
  makeSelectUser,
};
