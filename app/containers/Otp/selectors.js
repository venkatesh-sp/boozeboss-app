import { createSelector } from 'reselect';

const selectOtp = state => state.outlet;

const makeSelectError = () =>
  createSelector(
    selectOtp,
    otpState => otpState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(
    selectOtp,
    otpState => otpState.get('success'),
  );

export { makeSelectSuccess, makeSelectError };
