import { createSelector } from 'reselect';

const selectHomepage = state => state.homepage;

const makeSelectEvents = () =>
  createSelector(selectHomepage, homepageState =>
    homepageState.get('events'),
  );

const makeSelectError = () =>
  createSelector(selectHomepage, homepageState =>
    homepageState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectHomepage, homepageState =>
    homepageState.get('success'),
  );

export { 
  makeSelectEvents,
  makeSelectSuccess,
  makeSelectError
};
