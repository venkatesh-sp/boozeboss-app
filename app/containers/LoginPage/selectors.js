import { createSelector } from 'reselect';

const selectLogin = state => state.loginPage;

const makeSelectError = () =>
  createSelector(selectLogin, loginState =>
    loginState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectLogin, loginState =>
    loginState.get('success'),
  );

export { 
  makeSelectSuccess,
  makeSelectError
};
