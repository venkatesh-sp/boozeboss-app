import { createSelector } from 'reselect';

const selectItems = state => state.waiterOrders;

const makeSelectItems = () =>
  createSelector(
    selectItems,
    itemsState => itemsState.get('items'),
  );

const makeSelectError = () =>
  createSelector(
    selectItems,
    itemsState => itemsState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(
    selectItems,
    itemsState => itemsState.get('success'),
  );

export { makeSelectSuccess, makeSelectError, makeSelectItems };
