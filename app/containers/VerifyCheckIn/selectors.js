import { createSelector } from 'reselect';

const selectVerifyCheckIn = state => state.verifyCheckIn;

const makeSelectError = () =>
  createSelector(selectVerifyCheckIn, checkInState =>
    checkInState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectVerifyCheckIn, checkInState =>
    checkInState.get('success'),
  );

const makeSelectGuest = () =>
  createSelector(selectVerifyCheckIn, checkInState =>
    checkInState.get('guest'),
  );

export { 
  makeSelectSuccess,
  makeSelectError,
  makeSelectGuest
};
