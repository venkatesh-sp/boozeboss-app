import { createSelector } from 'reselect';

const selectVerification = state => state.verification;

const makeSelectError = () =>
  createSelector(selectVerification, verificationState =>
    verificationState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectVerification, verificationState =>
    verificationState.get('success'),
  );

export { 
  makeSelectSuccess,
  makeSelectError
};
