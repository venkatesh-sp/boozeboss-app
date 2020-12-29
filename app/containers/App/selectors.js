import { createSelector } from 'reselect';

const selectRouter = state => state.get('router');
const selectGlobal = state => state.global;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.get('location').toJS(),
  );

const makeSelectIsAuthenticated = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('isAuthenticated'),
  );

const makeSelectIsAgeVerified = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('isAgeVerified'),
  );

const makeSelectScope = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('scope'),
  );

const makeSelectRole = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('role'),
  );

const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('user'),
  );

const makeSelectUserId = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('userId'),
  );

export {
  makeSelectLocation,
  makeSelectIsAuthenticated,
  makeSelectScope,
  makeSelectRole,
  makeSelectIsAgeVerified,
  makeSelectUser,
  makeSelectUserId,
};
