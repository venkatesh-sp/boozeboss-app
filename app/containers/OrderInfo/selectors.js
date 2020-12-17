import { createSelector } from 'reselect';

const selectCart = state => state.cart;

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

export { makeSelectSuccess, makeSelectError, makeSelectCartItems };
