import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  ADD_CREDITS_PAYPAL_REQUEST, ADD_CREDITS_WITH_QR_REQUEST
} from './constants';

import {
  addCreditsWithPaypalSuccess, addCreditsWithPaypalError, addCreditsWithQRSuccess, addCreditsWithQRError
} from './actions';

import { makeSelectUser } from '../App/selectors';
import { getUser } from '../App/actions';


function* addCreditsWithPaypalSaga(params) {
  const {purchase, history} = params;
  const user = yield select(makeSelectUser());

  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/wallets/${user.wallet.id}/add-credits/paypal`;
  const options = {
    method: 'POST',
    body: JSON.stringify(purchase),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(addCreditsWithPaypalSuccess(response));
    yield put(getUser());
    alert(response);
    history.push({pathname: '/'});
  } catch (error) {
    console.log(error)
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(addCreditsWithPaypalError(jsonError));
  }
}

function* addCreditsWithQRSaga(params) {
  const {purchase, history} = params;

  const user = yield select(makeSelectUser());

  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/wallets/${user.wallet.id}/add-credits/qr`;
  const options = {
    method: 'POST',
    body: JSON.stringify(purchase),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(addCreditsWithQRSuccess(response));
  } catch (error) {
    console.log(error)
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(addCreditsWithQRError(jsonError));
  }
}

function* addCreditsWithPaypalRequest() {
  yield takeLatest(ADD_CREDITS_PAYPAL_REQUEST, addCreditsWithPaypalSaga);
}

function* addCreditsWithQRRequest() {
  yield takeLatest(ADD_CREDITS_WITH_QR_REQUEST, addCreditsWithQRSaga);
}

export default function* rootSaga() {
  yield all([
    fork(addCreditsWithPaypalRequest),
    fork(addCreditsWithQRRequest),
  ]);
}
