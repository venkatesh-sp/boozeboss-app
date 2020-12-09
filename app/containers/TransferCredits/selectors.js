import { createSelector } from 'reselect';

const selectTransferCredits = state => state.transferCredits;

const makeSelectError = () =>
  createSelector(selectTransferCredits, transferCreditsState =>
    transferCreditsState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectTransferCredits, transferCreditsState =>
    transferCreditsState.get('success'),
  );

export { 
  makeSelectSuccess,
  makeSelectError
};
