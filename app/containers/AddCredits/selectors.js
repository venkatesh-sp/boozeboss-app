import { createSelector } from 'reselect';

const selectAddCredits = state => state.addCredits;

const makeSelectError = () =>
  createSelector(selectAddCredits, addCreditsState =>
    addCreditsState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectAddCredits, addCreditsState =>
    addCreditsState.get('success'),
  );


export { 
  makeSelectError, 
  makeSelectSuccess,
};
