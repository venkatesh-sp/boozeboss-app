import { createSelector } from 'reselect';

const selectActionsContainer = state => state.actionsContainer;

const makeSelectError = () =>
  createSelector(selectActionsContainer, actionsContainerState =>
    actionsContainerState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(selectActionsContainer, actionsContainerState =>
    actionsContainerState.get('success'),
  );

const makeSelectActions = () =>
  createSelector(selectActionsContainer, actionsContainerState =>
    actionsContainerState.get('actions'),
  );

export { 
  makeSelectError, 
  makeSelectSuccess,
  makeSelectActions
};
