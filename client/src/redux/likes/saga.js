import { takeLatest, put, call } from "redux-saga/effects";
import http from "../../utils/http";
import * as types from "./types";

export function* addLike({ addQuery, getQuery }) {
    try {
        const response = yield call(() =>
            http.post(`${process.env.REACT_APP_ATLAS_URL}/addLike`, addQuery)
        );
        yield put({ type: types.ADD_LIKE_SUCCESS, response: response });
        // yield call(getLikes(), { query: getQuery });
    } catch (error) {
        yield put({ type: types.ADD_LIKE_FAILURE, error });
    }
}

export function* updateLike(payload) {
    try {
        const response = yield call(() =>
            http.put(`${process.env.REACT_APP_ATLAS_URL}/updateLike/${payload.updateQuery.id}`, payload.updateQuery.data)
        );
        yield put({ type: types.UPDATE_LIKE_SUCCESS, response: response });
        yield call(getLikesByCommentId, { query: payload.getQuery });
    } catch (error) {
        yield put({ type: types.UPDATE_LIKE_FAILURE, error });
    }
}

export function* deleteLike(payload) {
    try {
        const response = yield call(() =>
            http.delete(`${process.env.REACT_APP_ATLAS_URL}/deleteLike/${payload.query}`)
        );
        yield put({ type: types.DELETE_LIKE_SUCCESS, response: response });
        yield call(getLikesByCommentId, { query: {} });

    } catch (error) {
        yield put({ type: types.DELETE_LIKE_FAILURE, error });
    }
}

export function* getLikesByUserId(payload) {
    try {
        const response = yield call(() =>
            http.get(`${process.env.REACT_APP_ATLAS_URL}/getLikesByUserId`, { params: payload.query })
        );
        yield put({ type: types.GET_LIKES_BY_USER_ID_SUCCESS, response: response });
    } catch (error) {
        yield put({ type: types.GET_LIKES_BY_USER_ID_FAILURE, error });
    }
}
export function* getLikesByCommentId(payload) {
    try {
        const response = yield call(() =>
            http.get(`${process.env.REACT_APP_ATLAS_URL}/getLikesByCommentId`, { params: payload.query })
        );
        yield put({ type: types.GET_LIKES_BY_COMMENT_ID_SUCCESS, response: response });
    } catch (error) {
        yield put({ type: types.GET_LIKES_BY_COMMENT_ID_FAILURE, error });
    }
}

function* likeSaga() {
    yield takeLatest(types.ADD_LIKE_REQUEST, addLike);
    yield takeLatest(types.UPDATE_LIKE_REQUEST, updateLike);
    yield takeLatest(types.GET_LIKES_BY_USER_ID_REQUEST, getLikesByUserId);
    yield takeLatest(types.GET_LIKES_BY_COMMENT_ID_REQUEST, getLikesByCommentId);
    yield takeLatest(types.DELETE_LIKE_REQUEST, deleteLike);
}

export default likeSaga;
