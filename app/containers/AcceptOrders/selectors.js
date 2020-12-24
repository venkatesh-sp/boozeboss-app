import { createSelector } from 'reselect';

const selectItems = state => state.acceptorders;

const selectGlobal = state => state.global;

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

const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('user'),
  );

const makeSelectOutlet = () =>
  createSelector(
    selectItems,
    itemsState => itemsState.get('outlet'),
  );
export { makeSelectSuccess, makeSelectError, makeSelectUser, makeSelectOutlet };
