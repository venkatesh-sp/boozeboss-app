import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  GET_EVENT_REQUEST,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS
} from './constants';

import {
  getEvent, getEventSuccess, getEventError, updateEventSuccess
} from './actions';


function* getEventSaga(params) {
  const {event_id} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/events/${event_id}`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getEventSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getEventError(jsonError));
  }
}

function* updateEventSaga(params) {
  const {event_id, field} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/events/${event_id}`;
  const options = {
    method: 'PATCH',
    body: JSON.stringify(field)
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(updateEventSuccess(response));
    yield put(getEvent(event_id));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(updateEventError(jsonError));
  }
}

function* getEventRequest() {
  yield takeLatest(GET_EVENT_REQUEST, getEventSaga);
}

function* updateEventRequest() {
  yield takeLatest(UPDATE_EVENT_REQUEST, updateEventSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getEventRequest),
    fork(updateEventRequest),
  ]);
}
