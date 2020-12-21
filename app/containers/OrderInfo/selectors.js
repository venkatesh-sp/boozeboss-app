import { createSelector } from 'reselect';

const selectCart = state => state.cart;

const selectOutletInfo = state => state.outlet;

const makeSelectCartItems = () =>
  createSelector(
    selectCart,
    cartState => cartState.get('cartitems'),
  );

const makeSelectError = () =>
  createSelector(
    selectCart,
    cartState => cartState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(
    selectCart,
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

const makeSetCartItems = () =>
  createSelector(
    selectCart,
    cartState => cartState.set('cartitems', null),
  );

export {
  makeSelectSuccess,
  makeSelectError,
  makeSelectCartItems,
  makeSelectOutletInfo,
  makeSelectCurrentOutlet,
  makeSetCartItems,
};
