import { takeLatest, put, call } from "redux-saga/effects";
import http from "../../utils/http";
import * as types from "./types";

export function* addAppraisal({ addQuery, getQuery }) {
    try {
        const response = yield call(() =>
            http.post(`${process.env.REACT_APP_ATLAS_URL}/addAppraisal`, addQuery)
        );
        yield put({ type: types.ADD_APPRAISAL_SUCCESS, response: response });
        // yield call(getAppraisals, { query: getQuery });
    } catch (error) {
        yield put({ type: types.ADD_APPRAISAL_FAILURE, error });
    }
}

export function* updateAppraisal(payload) {
    try {
        const response = yield call(() =>
            http.put(`${process.env.REACT_APP_ATLAS_URL}/updateAppraisal/${payload.updateQuery.id}`, payload.updateQuery.data)
        );
        yield put({ type: types.UPDATE_APPRAISAL_SUCCESS, response: response });
        // yield call(getAppraisals, { query: payload.getQuery });
    } catch (error) {
        yield put({ type: types.UPDATE_APPRAISAL_FAILURE, error });
    }
}

export function* deleteAppraisal(payload) {
    try {
        const response = yield call(() =>
            http.delete(`${process.env.REACT_APP_ATLAS_URL}/deleteAppraisal/${payload.query}`)
        );
        yield put({ type: types.DELETE_APPRAISAL_SUCCESS, response: response });
        yield call(getAppraisals, { query: {} });

    } catch (error) {
        yield put({ type: types.DELETE_APPRAISAL_FAILURE, error });
    }
}

export function* getAppraisals(payload) {
    try {
        const response = yield call(() =>
            http.get(`${process.env.REACT_APP_ATLAS_URL}/getAppraisals`, { params: payload.query })
        );
        yield put({ type: types.GET_APPRAISALS_SUCCESS, response: response });
    } catch (error) {
        yield put({ type: types.GET_APPRAISALS_FAILURE, error });
    }
}

export function* getAppraisal(payload) {
    try {
        const response = yield call(() =>
            http.get(`${process.env.REACT_APP_ATLAS_URL}/getAppraisal`, payload.query)
        );
        yield put({ type: types.GET_APPRAISAL_SUCCESS, response: response });
    } catch (error) {
        yield put({ type: types.GET_APPRAISAL_FAILURE, error });
    }
}

function* appraisalSaga() {
    yield takeLatest(types.ADD_APPRAISAL_REQUEST, addAppraisal);
    yield takeLatest(types.UPDATE_APPRAISAL_REQUEST, updateAppraisal);
    yield takeLatest(types.GET_APPRAISALS_REQUEST, getAppraisals);
    yield takeLatest(types.GET_APPRAISAL_REQUEST, getAppraisal);
    yield takeLatest(types.DELETE_APPRAISAL_REQUEST, deleteAppraisal);
}

export default appraisalSaga;
