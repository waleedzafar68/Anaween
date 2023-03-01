import { takeLatest, put, call } from "redux-saga/effects";
import http from "../../utils/http";
import * as types from "./types";

export function* addComment({ addQuery, getQuery }) {
    try {
        const response = yield call(() =>
            http.post(`${process.env.REACT_APP_ATLAS_URL}/addComment`, addQuery)
        );
        yield put({ type: types.ADD_COMMENT_SUCCESS, response: response });
        yield call(getComments, { query: getQuery });
    } catch (error) {
        yield put({ type: types.ADD_COMMENT_FAILURE, error });
    }
}

export function* updateComment(payload) {
    try {
        const response = yield call(() =>
            http.put(`${process.env.REACT_APP_ATLAS_URL}/updateComment/${payload.updateQuery.id}`, payload.updateQuery.data)
        );
        yield put({ type: types.UPDATE_COMMENT_SUCCESS, response: response });
        yield call(getComments, { query: payload.getQuery });
    } catch (error) {
        yield put({ type: types.UPDATE_COMMENT_FAILURE, error });
    }
}

export function* deleteComment(payload) {
    try {
        const response = yield call(() =>
            http.delete(`${process.env.REACT_APP_ATLAS_URL}/deleteComment/${payload.query}`)
        );
        yield put({ type: types.DELETE_COMMENT_SUCCESS, response: response });
        yield call(getComments, { query: {} });

    } catch (error) {
        yield put({ type: types.DELETE_COMMENT_FAILURE, error });
    }
}

export function* getComments(payload) {
    try {
        const response = yield call(() =>
            http.get(`${process.env.REACT_APP_ATLAS_URL}/getComments`, { params: payload.query })
        );
        yield put({ type: types.GET_COMMENTS_SUCCESS, response: response });
    } catch (error) {
        yield put({ type: types.GET_COMMENTS_FAILURE, error });
    }
}

export function* getComment(payload) {
    try {
        const response = yield call(() =>
            http.get(`${process.env.REACT_APP_ATLAS_URL}/getComment`, payload.query)
        );
        yield put({ type: types.GET_COMMENT_SUCCESS, response: response });
    } catch (error) {
        yield put({ type: types.GET_COMMENT_FAILURE, error });
    }
}

export function* likeComment({ addQuery, getQuery }) {
    try {
        const response = yield call(() =>
            http.post(`${process.env.REACT_APP_ATLAS_URL}/likeComment`, addQuery)
        );
        yield put({ type: types.LIKE_COMMENT_SUCCESS, response: response });
        yield call(getComments, { query: getQuery });
    } catch (error) {
        yield put({ type: types.LIKE_COMMENT_FAILURE, error });
    }
}

function* commentSaga() {
    yield takeLatest(types.ADD_COMMENT_REQUEST, addComment);
    yield takeLatest(types.UPDATE_COMMENT_REQUEST, updateComment);
    yield takeLatest(types.GET_COMMENTS_REQUEST, getComments);
    yield takeLatest(types.GET_COMMENT_REQUEST, getComment);
    yield takeLatest(types.DELETE_COMMENT_REQUEST, deleteComment);
    yield takeLatest(types.LIKE_COMMENT_REQUEST, likeComment);
}

export default commentSaga;
