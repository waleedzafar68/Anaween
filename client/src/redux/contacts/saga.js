import { takeLatest, put, call } from "redux-saga/effects";
import http from "../../utils/http";
import * as types from "./types";

export function* addContact({ addQuery, getQuery }) {
    try {
        const response = yield call(() =>
            http.post(`${process.env.REACT_APP_ATLAS_URL}/addContact`, addQuery)
        );
        yield put({ type: types.ADD_CONTACT_SUCCESS, response: response });
        yield call(getContacts, { query: getQuery });
    } catch (error) {
        yield put({ type: types.ADD_CONTACT_FAILURE, error });
    }
}

export function* updateContact(payload) {
    try {
        const response = yield call(() =>
            http.put(`${process.env.REACT_APP_ATLAS_URL}/updateContact/${payload.updateQuery.id}`, payload.updateQuery.data)
        );
        yield put({ type: types.UPDATE_CONTACT_SUCCESS, response: response });
        yield call(getContacts, { query: payload.getQuery });
    } catch (error) {
        yield put({ type: types.UPDATE_CONTACT_FAILURE, error });
    }
}

export function* deleteContact(payload) {
    try {
        const response = yield call(() =>
            http.delete(`${process.env.REACT_APP_ATLAS_URL}/deleteContact/${payload.query}`)
        );
        yield put({ type: types.DELETE_CONTACT_SUCCESS, response: response });
        yield call(getContacts, { query: {} });

    } catch (error) {
        yield put({ type: types.DELETE_CONTACT_FAILURE, error });
    }
}

export function* getContacts(payload) {
    try {
        const response = yield call(() =>
            http.get(`${process.env.REACT_APP_ATLAS_URL}/getContacts`, { params: payload.query })
        );
        yield put({ type: types.GET_CONTACTS_SUCCESS, response: response });
    } catch (error) {
        yield put({ type: types.GET_CONTACTS_FAILURE, error });
    }
}

export function* getContact(payload) {
    try {
        const response = yield call(() =>
            http.get(`${process.env.REACT_APP_ATLAS_URL}/getContact`, payload.query)
        );
        yield put({ type: types.GET_CONTACT_SUCCESS, response: response });
    } catch (error) {
        yield put({ type: types.GET_CONTACT_FAILURE, error });
    }
}

export default function* contactSaga() {
    yield takeLatest(types.ADD_CONTACT_REQUEST, addContact);
    yield takeLatest(types.UPDATE_CONTACT_REQUEST, updateContact);
    yield takeLatest(types.GET_CONTACTS_REQUEST, getContacts);
    yield takeLatest(types.GET_CONTACT_REQUEST, getContact);
    yield takeLatest(types.DELETE_CONTACT_REQUEST, deleteContact);
}
