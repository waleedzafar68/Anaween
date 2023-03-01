import { takeLatest, put, call } from "redux-saga/effects";
import { getComments } from "../comments/saga";
import http from "../../utils/http";
import * as types from "./types";

export function* addReply({ addQuery, getQuery }) {
    try {
        const response = yield call(() =>
            http.post(`${process.env.REACT_APP_ATLAS_URL}/addReply`, addQuery)
        );
        yield put({ type: types.ADD_REPLY_SUCCESS, response: response });
        yield call(getComments, { query: getQuery });
        const comments = yield call(getComments, { query: getQuery });
    } catch (error) {
        yield put({ type: types.ADD_REPLY_FAILURE, error });
    }
}

export function* updateReply(payload) {
    try {
        const response = yield call(() =>
            http.put(`${process.env.REACT_APP_ATLAS_URL}/updateReply/${payload.updateQuery.id}`, payload.updateQuery.data)
        );
        yield put({ type: types.UPDATE_REPLY_SUCCESS, response: response });
        // yield call(getComments, { query: payload.getQuery });
    } catch (error) {
        yield put({ type: types.UPDATE_REPLY_FAILURE, error });
    }
}

export function* deleteReply(payload) {
    try {
        const response = yield call(() =>
            http.delete(`${process.env.REACT_APP_ATLAS_URL}/deleteReply/${payload.query}`)
        );
        yield put({ type: types.DELETE_REPLY_SUCCESS, response: response });
        // yield call(getComments, { query: {} });

    } catch (error) {
        yield put({ type: types.DELETE_REPLY_FAILURE, error });
    }
}

export function* getReplies(payload) {
    try {
        const response = yield call(() =>
            http.get(`${process.env.REACT_APP_ATLAS_URL}/getReplies`, { params: payload.query })
        );
        yield put({ type: types.GET_REPLIES_SUCCESS, response: response });
    } catch (error) {
        yield put({ type: types.GET_REPLIES_FAILURE, error });
    }
}

export function* getReply(payload) {
    try {
        const response = yield call(() =>
            http.get(`${process.env.REACT_APP_ATLAS_URL}/getReply`, payload.query)
        );
        yield put({ type: types.GET_REPLY_SUCCESS, response: response });
    } catch (error) {
        yield put({ type: types.GET_REPLY_FAILURE, error });
    }
}

function* replySaga() {
    yield takeLatest(types.ADD_REPLY_REQUEST, addReply);
    yield takeLatest(types.UPDATE_REPLY_REQUEST, updateReply);
    yield takeLatest(types.GET_REPLIES_REQUEST, getReplies);
    yield takeLatest(types.GET_REPLY_REQUEST, getReply);
    yield takeLatest(types.DELETE_REPLY_REQUEST, deleteReply);
}

export default replySaga;
