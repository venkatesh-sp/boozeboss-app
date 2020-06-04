import { createSelector } from 'reselect';

const selectOrderPage = state => state.orderPage;

const makeSelectError = () =>
  createSelector(selectOrderPage, orderState =>
    orderState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectOrderPage, orderState =>
    orderState.get('success'),
  );

const makeSelectOrder = () =>
  createSelector(selectOrderPage, orderState =>
    orderState.get('order'),
  );

export { 
  makeSelectError, 
  makeSelectSuccess,
  makeSelectOrder
};
