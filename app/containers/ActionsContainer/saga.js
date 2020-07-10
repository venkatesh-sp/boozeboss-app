import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  GET_WALLET_ACTIONS_REQUEST
} from './constants';

import {
  getWalletActionsSuccess, getWalletActionsError
} from './actions';

import { makeSelectUser } from '../App/selectors';


function* getActionsSaga() {
  const user = yield select(makeSelectUser());

  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/wallets/${user.wallet.id}/actions`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getWalletActionsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getWalletActionsError(jsonError));
  }
}

function* getWalletActionsRequest() {
  yield takeLatest(GET_WALLET_ACTIONS_REQUEST, getActionsSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getWalletActionsRequest),
  ]);
}
