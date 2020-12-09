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

const makeSelectStep = () =>
  createSelector(selectSignup, signupState =>
    signupState.get('step'),
  );

const makeSelectToken = () =>
  createSelector(selectSignup, signupState =>
    signupState.get('token'),
  );

export { 
  makeSelectStep,
  makeSelectToken,
  makeSelectSuccess,
  makeSelectError
};
