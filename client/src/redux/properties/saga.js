import { takeLatest, put, call } from "redux-saga/effects";
import http from "../../utils/http";
import * as types from "./types";

export function* searchProperty(payload) {
  try {
    console.log(payload);
    const query = payload.query;
    const response = yield call(() =>
      http.get(`${process.env.REACT_APP_ATLAS_URL}/searchProperty`, { params: query })
    );
    yield put({ type: types.SEARCH_PROPERTY_SUCCESS, response: response });
  } catch (error) {
    yield put({ type: types.SEARCH_PROPERTY_FAILURE, error });
  }
}

export function* addProperty({ addQuery, getQuery }) {
  try {
    const response = yield call(() =>
      http.post(`${process.env.REACT_APP_ATLAS_URL}/addProperty`, addQuery)
    );
    yield put({ type: types.ADD_PROPERTY_SUCCESS, response: response });
    yield call(getProperties, { query: getQuery });
  } catch (error) {
    yield put({ type: types.ADD_PROPERTY_FAILURE, error });
  }
}

export function* updateProperty(payload) {
  try {
    const response = yield call(() =>
      http.put(
        `${process.env.REACT_APP_ATLAS_URL}/updateProperty/${payload.updateQuery.id}`,
        payload.updateQuery.data
      )
    );
    yield put({ type: types.UPDATE_PROPERTY_SUCCESS, response: response });
    yield call(getProperties, { query: payload.getQuery });
  } catch (error) {
    yield put({ type: types.UPDATE_PROPERTY_FAILURE, error });
  }
}

export function* deleteProperty(payload) {
  try {
    const response = yield call(() =>
      http.delete(
        `${process.env.REACT_APP_ATLAS_URL}/deleteProperty/${payload.query}`
      )
    );
    yield put({ type: types.DELETE_PROPERTY_SUCCESS, response: response });
    yield call(getProperties, { query: {} });
  } catch (error) {
    yield put({ type: types.DELETE_PROPERTY_FAILURE, error });
  }
}

export function* getProperties(payload) {
  try {
    const response = yield call(() =>
      http.get(`${process.env.REACT_APP_ATLAS_URL}/getProperties`, { params: payload.query })
    );
    yield put({ type: types.GET_PROPERTIES_SUCCESS, response: response });
  } catch (error) {
    yield put({ type: types.GET_PROPERTIES_FAILURE, error });
  }
}
export function* getPropertiesByUserId(payload) {
  try {
    const response = yield call(() =>
      http.get(`${process.env.REACT_APP_ATLAS_URL}/getPropertiesByUserId`, { params: payload.query })
    );
    yield put({ type: types.GET_PROPERTIES_BY_USERID_SUCCESS, response: response });
  } catch (error) {
    yield put({ type: types.GET_PROPERTIES_BY_USERID_FAILURE, error });
  }
}

export function* getProperty(payload) {
  try {
    const response = yield call(() =>
      http.get(`${process.env.REACT_APP_ATLAS_URL}/getProperty/${payload.query}`)
    );
    yield put({ type: types.GET_PROPERTY_SUCCESS, response: response });
  } catch (error) {
    yield put({ type: types.GET_PROPERTY_FAILURE, error });
  }
}

function* propertySaga() {
  yield takeLatest(types.SEARCH_PROPERTY_REQUEST, searchProperty);
  yield takeLatest(types.ADD_PROPERTY_REQUEST, addProperty);
  yield takeLatest(types.UPDATE_PROPERTY_REQUEST, updateProperty);
  yield takeLatest(types.GET_PROPERTIES_REQUEST, getProperties);
  yield takeLatest(types.GET_PROPERTIES_BY_USERID_REQUEST, getPropertiesByUserId);
  yield takeLatest(types.GET_PROPERTY_REQUEST, getProperty);
  yield takeLatest(types.DELETE_PROPERTY_REQUEST, deleteProperty);
}

export default propertySaga;