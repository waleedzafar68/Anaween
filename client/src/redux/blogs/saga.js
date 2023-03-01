import { takeLatest, put, call } from "redux-saga/effects";
import http from "../../utils/http";
import * as types from "./types";

export function* addBlog({ addQuery, getQuery }) {
    try {
        const response = yield call(() =>
            http.post(`${process.env.REACT_APP_ATLAS_URL}/addBlog`, addQuery)
        );
        yield put({ type: types.ADD_BLOG_SUCCESS, response: response });
        yield call(getBlogs, { query: getQuery });
    } catch (error) {
        yield put({ type: types.ADD_BLOG_FAILURE, error });
    }
}

export function* updateBlog(payload) {
    try {
        const response = yield call(() =>
            http.put(`${process.env.REACT_APP_ATLAS_URL}/updateBlog/${payload.updateQuery.id}`, payload.updateQuery.data)
        );
        yield put({ type: types.UPDATE_BLOG_SUCCESS, response: response });
        yield call(getBlogs, { query: payload.getQuery });
    } catch (error) {
        yield put({ type: types.UPDATE_BLOG_FAILURE, error });
    }
}

export function* deleteBlog(payload) {
    try {
        const response = yield call(() =>
            http.delete(`${process.env.REACT_APP_ATLAS_URL}/deleteBlog/${payload.query}`)
        );
        yield put({ type: types.DELETE_BLOG_SUCCESS, response: response });
        yield call(getBlogs, { query: {} });

    } catch (error) {
        yield put({ type: types.DELETE_BLOG_FAILURE, error });
    }
}

export function* getBlogs(payload) {
    try {
        const response = yield call(() =>
            http.get(`${process.env.REACT_APP_ATLAS_URL}/getBlogs`, { params: payload.query })
        );
        yield put({ type: types.GET_BLOGS_SUCCESS, response: response });
    } catch (error) {
        yield put({ type: types.GET_BLOGS_FAILURE, error });
    }
}

export function* getBlog(payload) {
    try {
        const response = yield call(() =>
            http.get(`${process.env.REACT_APP_ATLAS_URL}/getBlog`, payload.query)
        );
        yield put({ type: types.GET_BLOG_SUCCESS, response: response });
    } catch (error) {
        yield put({ type: types.GET_BLOG_FAILURE, error });
    }
}

function* blogSaga() {
    yield takeLatest(types.ADD_BLOG_REQUEST, addBlog);
    yield takeLatest(types.UPDATE_BLOG_REQUEST, updateBlog);
    yield takeLatest(types.GET_BLOGS_REQUEST, getBlogs);
    yield takeLatest(types.GET_BLOG_REQUEST, getBlog);
    yield takeLatest(types.DELETE_BLOG_REQUEST, deleteBlog);
}

export default blogSaga;
