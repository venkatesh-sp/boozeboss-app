import { createSelector } from 'reselect';

const selectEvent = state => state.event;

const makeSelectEvent = () =>
  createSelector(selectEvent, eventState =>
    eventState.get('event'),
  );

const makeSelectCart = () =>
  createSelector(selectEvent, eventState =>
    eventState.get('cart'),
  );


export { 
  makeSelectEvent,
  makeSelectCart
};
