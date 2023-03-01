import { takeLatest, put, call } from "redux-saga/effects";
import http from "../../utils/http";
import * as types from "./types";

export function* addUnitType({ addQuery, getQuery }) {
  try {
    const response = yield call(() =>
      http.post(`${process.env.REACT_APP_ATLAS_URL}/addUnitType`, addQuery)
    );
    yield put({ type: types.ADD_UNIT_TYPE_SUCCESS, response: response });
    yield call(getUnitTypes, { query: getQuery });
  } catch (error) {
    yield put({ type: types.ADD_UNIT_TYPE_FAILURE, error });
  }
}

export function* updateUnitType(payload) {
  try {
    const response = yield call(() =>
      http.put(`${process.env.REACT_APP_ATLAS_URL}/updateUnitType/${payload.updateQuery.id}`, payload.updateQuery.data)
    );
    yield put({ type: types.UPDATE_UNIT_TYPE_SUCCESS, response: response });
    yield call(getUnitTypes, { query: payload.getQuery });
  } catch (error) {
    yield put({ type: types.UPDATE_UNIT_TYPE_FAILURE, error });
  }
}

export function* deleteUnitType(payload) {
  try {
    const response = yield call(() =>
      http.delete(`${process.env.REACT_APP_ATLAS_URL}/deleteUnitType/${payload.query}`)
    );
    yield put({ type: types.DELETE_UNIT_TYPE_SUCCESS, response: response });
    yield call(getUnitTypes, { query: {} });

  } catch (error) {
    yield put({ type: types.DELETE_UNIT_TYPE_FAILURE, error });
  }
}

export function* getUnitTypes(payload) {
  try {
    const response = yield call(() =>
      http.get(`${process.env.REACT_APP_ATLAS_URL}/getUnitTypes`, { params: payload.query })
    );
    yield put({ type: types.GET_UNIT_TYPES_SUCCESS, response: response });
  } catch (error) {
    yield put({ type: types.GET_UNIT_TYPES_FAILURE, error });
  }
}

export function* getUnitType(payload) {
  try {
    const response = yield call(() =>
      http.get(`${process.env.REACT_APP_ATLAS_URL}/getUnitType`, payload.query)
    );
    yield put({ type: types.GET_UNIT_TYPE_SUCCESS, response: response });
  } catch (error) {
    yield put({ type: types.GET_UNIT_TYPE_FAILURE, error });
  }
}

function* unitTypeSaga() {
  yield takeLatest(types.ADD_UNIT_TYPE_REQUEST, addUnitType);
  yield takeLatest(types.UPDATE_UNIT_TYPE_REQUEST, updateUnitType);
  yield takeLatest(types.GET_UNIT_TYPES_REQUEST, getUnitTypes);
  yield takeLatest(types.GET_UNIT_TYPE_REQUEST, getUnitType);
  yield takeLatest(types.DELETE_UNIT_TYPE_REQUEST, deleteUnitType);
}

export default unitTypeSaga;
