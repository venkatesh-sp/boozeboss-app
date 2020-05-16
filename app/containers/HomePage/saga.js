import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  GET_GUEST_EVENTS_REQUEST,
  GET_AGENCY_EVENTS_REQUEST
} from './constants';

import {
  getEventsSuccess, getEventsError, getAgencyEventsSuccess, getAgencyEventsError
} from './actions';

function* getEventsSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/events/my-events`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getEventsSuccess(response))
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getEventsError(jsonError));
  }
}


function* getAgencyEventsSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/events`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getAgencyEventsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getAgencyEventsError(jsonError));
  }
}

function* getEventsRequest() {
  yield takeLatest(GET_GUEST_EVENTS_REQUEST, getEventsSaga);
}

function* getAgencyEventsRequest() {
  yield takeLatest(GET_AGENCY_EVENTS_REQUEST, getAgencyEventsSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getEventsRequest),
    fork(getAgencyEventsRequest),
  ]);
}
