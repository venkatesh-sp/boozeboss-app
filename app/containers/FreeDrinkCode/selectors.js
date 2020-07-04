import { createSelector } from 'reselect';

const selectFreeDrink = state => state.freeDrinkCode;

const makeSelectCode = () =>
  createSelector(selectFreeDrink, freeDrinkState =>
    freeDrinkState.get('code'),
  );

const makeSelectProduct = () =>
  createSelector(selectFreeDrink, freeDrinkState =>
    freeDrinkState.get('product'),
  );

const makeSelectError = () =>
  createSelector(selectFreeDrink, freeDrinkState =>
    freeDrinkState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectFreeDrink, freeDrinkState =>
    freeDrinkState.get('success'),
  );

export { 
  makeSelectCode,
  makeSelectProduct,
  makeSelectSuccess,
  makeSelectError
};
