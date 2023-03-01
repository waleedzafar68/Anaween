import { takeLatest, put, call } from "redux-saga/effects";
import http from "../../utils/http";
import * as types from "./types";


export function* updateNotification(payload) {
    try {
        const response = yield call(() =>
            http.put(`${process.env.REACT_APP_ATLAS_URL}/updateNotification/${payload.updateQuery.id}`, payload.updateQuery.data)
        );
        yield put({ type: types.UPDATE_NOTIFICATION_SUCCESS, response: response });
        yield call(getNotificationsByUserId, { query: payload.getQuery });
    } catch (error) {
        yield put({ type: types.UPDATE_NOTIFICATION_FAILURE, error });
    }
}

export function* updateNotificationStatus(payload) {
    try {
        const response = yield call(() =>
            http.put(`${process.env.REACT_APP_ATLAS_URL}/updateNotificationStatus/${payload.updateQuery.id}`, payload.updateQuery.data)
        );
        yield put({ type: types.UPDATE_NOTIFICATION_STATUS_SUCCESS, response: response });
        yield call(getNotificationsByUserId, { query: payload.updateQuery.id });
    } catch (error) {
        yield put({ type: types.UPDATE_NOTIFICATION_STATUS_FAILURE, error });
    }
}

export function* deleteNotification(payload) {
    try {
        const response = yield call(() =>
            http.delete(`${process.env.REACT_APP_ATLAS_URL}/deleteNotification/${payload.query}`)
        );
        yield put({ type: types.DELETE_NOTIFICATION_SUCCESS, response: response });
        yield call(getNotificationsByUserId, { query: {} });

    } catch (error) {
        yield put({ type: types.DELETE_NOTIFICATION_FAILURE, error });
    }
}

export function* getNotificationsByUserId(payload) {
    try {
        // console.log("Called");
        const response = yield call(() =>
            http.get(`${process.env.REACT_APP_ATLAS_URL}/getNotificationsByUserId/${payload.query}`)
        );
        yield put({ type: types.GET_NOTIFICATIONS_BY_USERID_SUCCESS, response: response });
    } catch (error) {
        yield put({ type: types.GET_NOTIFICATIONS_BY_USERID_FAILURE, error });
    }
}


function* notificationSaga() {
    yield takeLatest(types.UPDATE_NOTIFICATION_REQUEST, updateNotification);
    yield takeLatest(types.UPDATE_NOTIFICATION_STATUS_REQUEST, updateNotificationStatus);
    yield takeLatest(types.GET_NOTIFICATIONS_BY_USERID_REQUEST, getNotificationsByUserId);
    yield takeLatest(types.DELETE_NOTIFICATION_REQUEST, deleteNotification);
}

export default notificationSaga;
