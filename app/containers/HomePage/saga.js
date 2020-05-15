import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  SIGNUP_GUEST_REQUEST,
  FACEBOOK_LOGIN_REQUEST,
  GET_GUEST_EVENTS_REQUEST
} from './constants';

import {
  getEventsSuccess, getEventsError,
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

function* getEventsRequest() {
  yield takeLatest(GET_GUEST_EVENTS_REQUEST, getEventsSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getEventsRequest)
  ]);
}
