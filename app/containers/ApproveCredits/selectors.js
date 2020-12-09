import { createSelector } from 'reselect';

const selectApproveCredits = state => state.approveCredits;

const makeSelectError = () =>
  createSelector(selectApproveCredits, approveCreditsState =>
    approveCreditsState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectApproveCredits, approveCreditsState =>
    approveCreditsState.get('success'),
  );

const makeSelectWalletPurchase = () =>
  createSelector(selectApproveCredits, approveCreditsState =>
    approveCreditsState.get('wallet_purchase'),
  );

const makeSelectEvents = () =>
  createSelector(selectApproveCredits, approveCreditsState =>
    approveCreditsState.get('events'),
  );


export { 
  makeSelectError, 
  makeSelectSuccess,
  makeSelectWalletPurchase, 
  makeSelectEvents
};
