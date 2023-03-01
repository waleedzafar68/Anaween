import { takeLatest, put, call } from "redux-saga/effects";
import http from "../../utils/http";
import * as types from "./types";

export function* addUser({ addQuery, getQuery }) {
    try {
        const response = yield call(() =>
            http.post(`${process.env.REACT_APP_ATLAS_URL}/addUser`, addQuery)
        );
        yield put({ type: types.ADD_USER_SUCCESS, response: response });
        yield call(getUsers, { query: getQuery });
    } catch (error) {
        yield put({ type: types.ADD_USER_FAILURE, error });
    }
}

export function* updateUser(payload) {
    try {
        const response = yield call(() =>
            http.put(`${process.env.REACT_APP_ATLAS_URL}/updateUser/${payload.updateQuery.id}`, payload.updateQuery.data)
        );
        yield put({ type: types.UPDATE_USER_SUCCESS, response: response });
        yield call(getUsers, { query: payload.getQuery });
    } catch (error) {
        yield put({ type: types.UPDATE_USER_FAILURE, error });
    }
}

export function* updateUserStatus(payload) {
    try {
        console.log(payload.getQuery.isPro);
        const response = yield call(() =>
            http.put(`${process.env.REACT_APP_ATLAS_URL}/updateUserStatus/${payload.updateQuery}`, payload.getQuery)
        );
        yield put({ type: types.UPDATE_USER_STATUS_SUCCESS, response: response });
        yield call(getUsers, { query: payload.getQuery });
    } catch (error) {
        yield put({ type: types.UPDATE_USER_STATUS_FAILURE, error });
    }
}

export function* deleteUser(payload) {
    try {
        const response = yield call(() =>
            http.delete(`${process.env.REACT_APP_ATLAS_URL}/deleteUser/${payload.query}`)
        );
        yield put({ type: types.DELETE_USER_SUCCESS, response: response });
        yield call(getUsers, { query: {} });

    } catch (error) {
        yield put({ type: types.DELETE_USER_FAILURE, error });
    }
}

export function* getUsers(payload) {
    try {
        const response = yield call(() =>
            http.get(`${process.env.REACT_APP_ATLAS_URL}/getUsers`, { params: payload.query })
        );
        yield put({ type: types.GET_USERS_SUCCESS, response: response });
    } catch (error) {
        yield put({ type: types.GET_USERS_FAILURE, error });
    }
}

export function* getUser(payload) {
    try {
        const response = yield call(() =>
            http.get(`${process.env.REACT_APP_ATLAS_URL}/getUser/${payload.query}`)
        );
        yield put({ type: types.GET_USER_SUCCESS, response: response });
    } catch (error) {
        yield put({ type: types.GET_USER_FAILURE, error });
    }
}

function* userSaga() {
    yield takeLatest(types.ADD_USER_REQUEST, addUser);
    yield takeLatest(types.UPDATE_USER_REQUEST, updateUser);
    yield takeLatest(types.UPDATE_USER_STATUS_REQUEST, updateUserStatus);
    yield takeLatest(types.GET_USERS_REQUEST, getUsers);
    yield takeLatest(types.GET_USER_REQUEST, getUser);
    yield takeLatest(types.DELETE_USER_REQUEST, deleteUser);
}

export default userSaga;
