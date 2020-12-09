import { createSelector } from 'reselect';

const selectInvite = state => state.inviteCode;

const makeSelectCode = () =>
  createSelector(selectInvite, inviteState =>
    inviteState.get('code'),
  );

/*const makeSelectSuccess = () =>
  createSelector(selectSignup, signupState =>
    signupState.get('success'),
  ); */

export { 
  makeSelectCode
};
