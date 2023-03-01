import { takeLatest, put, call } from "redux-saga/effects";
import http from "../../utils/http";
import * as types from "./types";

export function* searchUserProperty(payload) {
  try {
    console.log(payload);
    const query = payload.query;
    const response = yield call(() =>
      http.get(`${process.env.REACT_APP_ATLAS_URL}/searchUserProperty`, { params: query })
    );
    yield put({ type: types.SEARCH_USER_PROPERTY_SUCCESS, response: response });
  } catch (error) {
    yield put({ type: types.SEARCH_USER_PROPERTY_FAILURE, error });
  }
}

export function* addUserProperty({ addQuery, getQuery }) {
  try {
    const response = yield call(() =>
      http.post(`${process.env.REACT_APP_ATLAS_URL}/addUserProperty`, addQuery)
    );
    yield put({ type: types.ADD_USER_PROPERTY_SUCCESS, response: response });
    yield call(getUserProperties, { query: getQuery });
  } catch (error) {
    yield put({ type: types.ADD_USER_PROPERTY_FAILURE, error });
  }
}

export function* updateUserProperty(payload) {
  try {
    const response = yield call(() =>
      http.put(
        `${process.env.REACT_APP_ATLAS_URL}/updateUserProperty/${payload.updateQuery.id}`,
        payload.updateQuery.data
      )
    );
    yield put({ type: types.UPDATE_USER_PROPERTY_SUCCESS, response: response });
    yield call(getUserProperties, { query: payload.getQuery });
  } catch (error) {
    yield put({ type: types.UPDATE_USER_PROPERTY_FAILURE, error });
  }
}

export function* deleteUserProperty(payload) {
  try {
    const response = yield call(() =>
      http.delete(
        `${process.env.REACT_APP_ATLAS_URL}/deleteUserProperty/${payload.query}`
      )
    );
    yield put({ type: types.DELETE_USER_PROPERTY_SUCCESS, response: response });
    yield call(getUserProperties, { query: {} });
  } catch (error) {
    yield put({ type: types.DELETE_USER_PROPERTY_FAILURE, error });
  }
}

export function* getUserProperties(payload) {
  try {
    const response = yield call(() =>
      http.get(`${process.env.REACT_APP_ATLAS_URL}/getUserProperties`, { params: payload.query })
    );
    yield put({ type: types.GET_USER_PROPERTIES_SUCCESS, response: response });
  } catch (error) {
    yield put({ type: types.GET_USER_PROPERTIES_FAILURE, error });
  }
}
export function* getUserPropertiesByUserId(payload) {
  try {
    const response = yield call(() =>
      http.get(`${process.env.REACT_APP_ATLAS_URL}/getUserPropertiesByUserId/${payload.query}`)
    );
    yield put({ type: types.GET_USER_PROPERTIES_BY_USERID_SUCCESS, response: response });
  } catch (error) {
    yield put({ type: types.GET_USER_PROPERTIES_BY_USERID_FAILURE, error });
  }
}

export function* getUserProperty(payload) {
  try {
    const response = yield call(() =>
      http.get(`${process.env.REACT_APP_ATLAS_URL}/getUserProperty/${payload.query}`)
    );
    yield put({ type: types.GET_USER_PROPERTY_SUCCESS, response: response });
  } catch (error) {
    yield put({ type: types.GET_USER_PROPERTY_FAILURE, error });
  }
}

function* userPropertySaga() {
  yield takeLatest(types.SEARCH_USER_PROPERTY_REQUEST, searchUserProperty);
  yield takeLatest(types.ADD_USER_PROPERTY_REQUEST, addUserProperty);
  yield takeLatest(types.UPDATE_USER_PROPERTY_REQUEST, updateUserProperty);
  yield takeLatest(types.GET_USER_PROPERTIES_REQUEST, getUserProperties);
  yield takeLatest(types.GET_USER_PROPERTIES_BY_USERID_REQUEST, getUserPropertiesByUserId);
  yield takeLatest(types.GET_USER_PROPERTY_REQUEST, getUserProperty);
  yield takeLatest(types.DELETE_USER_PROPERTY_REQUEST, deleteUserProperty);
}

export default userPropertySaga;