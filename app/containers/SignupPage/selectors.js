import { createSelector } from 'reselect';

const selectSignup = state => state.signupPage;

const makeSelectError = () =>
  createSelector(selectSignup, signupState =>
    signupState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectSignup, signupState =>
    signupState.get('success'),
  );

export { 
  makeSelectSuccess,
  makeSelectError
};
