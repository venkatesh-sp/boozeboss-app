import { createSelector } from 'reselect';

const selectAuth = state => state.auth;

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

export { makeSelectError, makeSelectSuccess, makeSelectToken };
