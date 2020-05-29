import { createSelector } from 'reselect';

const selectVerifyCheckOut = state => state.verifyCheckOut;

const makeSelectError = () =>
  createSelector(selectVerifyCheckOut, checkOutState =>
    checkOutState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectVerifyCheckOut, checkOutState =>
    checkOutState.get('success'),
  );

const makeSelectGuest = () =>
  createSelector(selectVerifyCheckOut, checkOutState =>
    checkOutState.get('guest'),
  );

export { 
  makeSelectSuccess,
  makeSelectError,
  makeSelectGuest
};
