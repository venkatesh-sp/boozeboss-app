import { createSelector } from 'reselect';

const selectAuth = state => state.auth;
const selectGlobal = state => state.global;

const makeSelectToken = () =>
  createSelector(
    selectAuth,
    authState => authState.get('token'),
  );

const makeSelectError = () =>
  createSelector(
    selectAuth,
    authState => authState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(
    selectAuth,
    authState => authState.get('success'),
  );
const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('user'),
  );
export { makeSelectError, makeSelectSuccess, makeSelectToken, makeSelectUser };
