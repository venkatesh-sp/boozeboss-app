import { createSelector } from 'reselect';

const selectItems = state => state.waiterOrders;

const selectGlobal = state => state.global;

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

const makeSelectCurrentOutlet = () =>
  createSelector(
    selectItems,
    outletState => outletState.get('currentOutlet'),
  );

const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('user'),
  );

const makeSelectOultlet = () =>
  createSelector(
    selectItems,
    itemsState => itemsState.get('outlet'),
  );
export {
  makeSelectSuccess,
  makeSelectError,
  makeSelectItems,
  makeSelectCurrentOutlet,
  makeSelectUser,
  makeSelectOultlet,
};
