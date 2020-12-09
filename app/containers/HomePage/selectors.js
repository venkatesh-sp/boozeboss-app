import { createSelector } from 'reselect';

const selectHomepage = state => state.homepage;

const makeSelectEvents = () =>
  createSelector(selectHomepage, homepageState =>
    homepageState.get('events'),
  );

const makeSelectAgencyEvents = () =>
  createSelector(selectHomepage, homepageState =>
    homepageState.get('agencyEvents'),
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
  makeSelectAgencyEvents,
  makeSelectSuccess,
  makeSelectError
};
