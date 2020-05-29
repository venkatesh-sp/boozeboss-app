import { createSelector } from 'reselect';

const selectEvent = state => state.event;

const makeSelectEvent = () =>
  createSelector(selectEvent, eventState =>
    eventState.get('event'),
  );


export { 
  makeSelectEvent
};
