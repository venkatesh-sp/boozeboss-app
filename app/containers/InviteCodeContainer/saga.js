import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  GET_INVITE_TOKEN_REQUEST
} from './constants';

import {
  getInviteCodeSuccess, getInviteCodeError
} from './actions';


function* getInviteCodeSaga(params) {
  const {event_id} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/events/${event_id}/get-token`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getInviteCodeSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getInviteCodeError(jsonError));
  }
}

function* getInviteCodeRequest() {
  yield takeLatest(GET_INVITE_TOKEN_REQUEST, getInviteCodeSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getInviteCodeRequest),
  ]);
}
