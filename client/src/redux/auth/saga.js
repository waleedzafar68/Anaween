import { takeLatest, put, call } from 'redux-saga/effects'
import http from '../../utils/http'
import axios from 'axios'
import * as types from './types'

const registerUserService = (request) => {
    const parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request.user)
    };

    return http.post(`${process.env.REACT_APP_ATLAS_URL}/register`, parameters)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        });
};

export function* register(payload) {
    try {
        const response = yield call(() => axios.post(`${process.env.REACT_APP_ATLAS_URL}/addUser`, payload.query))
        yield [
            put({ type: types.REGISTER_SUCCESS, response })
        ];
    } catch (error) {
        yield put({ type: types.REGISTER_ERROR, error });
    }
}

export function* login(payload) {
    try {
        const response = yield call(() => axios.post(`${process.env.REACT_APP_ATLAS_URL}/Authenticate`, payload.query))
        yield put({ type: types.LOGIN_SUCCESS, response: response })
    } catch (error) {
        yield put({ type: types.LOGIN_ERROR, error })
    }
}

export function* logout() {
    try {
    } catch (error) {
        yield put({ type: types.LOG_OUT_ERROR, error })
    }
}


function* authSaga() {
    yield takeLatest(types.LOGIN_REQUEST, login)
    yield takeLatest(types.REGISTER_REQUEST, register)
    yield takeLatest(types.LOG_OUT_REQUEST, logout)
}

export default authSaga;