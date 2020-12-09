import { createSelector } from 'reselect';

const selectApproveFreeDrink = state => state.approveFreeDrink;

const makeSelectProduct = () =>
  createSelector(selectApproveFreeDrink, approveFreeDrinkState =>
    approveFreeDrinkState.get('product'),
  );

const makeSelectError = () =>
  createSelector(selectApproveFreeDrink, approveFreeDrinkState =>
    approveFreeDrinkState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectApproveFreeDrink, approveFreeDrinkState =>
    approveFreeDrinkState.get('success'),
  );

export { 
  makeSelectProduct,
  makeSelectSuccess,
  makeSelectError
};
