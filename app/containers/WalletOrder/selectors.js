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

const makeSelectOrderIdentifier = () =>
  createSelector(selectWalletOrder, walletOrderState =>
    walletOrderState.get('order_identifier'),
  );

export { 
  makeSelectError, 
  makeSelectSuccess,
  makeSelectOrderIdentifier
};
