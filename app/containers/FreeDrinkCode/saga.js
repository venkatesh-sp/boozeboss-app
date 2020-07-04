import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  GENERATE_FREE_DRINK_CODE_REQUEST
} from './constants';

import {
  generateCodeSuccess, generateCodeError
} from './actions';


function* generateCodeSaga(params) {
  const {event_id, event_guest_id} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/events/${event_id}/guest/${event_guest_id}/free-drink-code`;
  const options = {
    method: 'POST',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(generateCodeSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(generateCodeError(jsonError));
  }
}


function* generateCodeRequest() {
  yield takeLatest(GENERATE_FREE_DRINK_CODE_REQUEST, generateCodeSaga);
}

export default function* rootSaga() {
  yield all([
    fork(generateCodeRequest),
  ]);
}
