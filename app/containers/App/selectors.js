import { createSelector } from 'reselect';

const selectRouter = state => state.get('router');
const selectGlobal = state => state.global;

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

const makeSelectIsAuthenticated = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('isAuthenticated'),
  );

const makeSelectScope = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('scope'),
  );

const makeSelectRole = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('role'),
  );

export { 
  makeSelectLocation,
  makeSelectIsAuthenticated,
  makeSelectScope,
  makeSelectRole
};