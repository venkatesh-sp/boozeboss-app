import { createSelector } from 'reselect';

const selectWalletOrder = state => state.walletOrder;

const makeSelectError = () =>
  createSelector(selectWalletOrder, walletOrderState =>
    walletOrderState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectWalletOrder, walletOrderState =>
    walletOrderState.get('success'),
  );

export { 
  makeSelectError, 
  makeSelectSuccess
};
