import { takeLatest, put, call } from "redux-saga/effects";
import http from "../../utils/http";
import * as types from "./types";

export function* addLocation({ addQuery, getQuery }) {
  try {
    const response = yield call(() =>
      http.post(`${process.env.REACT_APP_ATLAS_URL}/addLocation`, addQuery)
    );
    yield put({ type: types.ADD_LOCATION_SUCCESS, response: response });
    yield call(getLocations, { query: getQuery });
  } catch (error) {
    yield put({ type: types.ADD_LOCATION_FAILURE, error });
  }
}

export function* updateLocation(payload) {
  try {
    const response = yield call(() =>
      http.put(`${process.env.REACT_APP_ATLAS_URL}/updateLocation/${payload.updateQuery.id}`, payload.updateQuery.data)
    );
    yield put({ type: types.UPDATE_LOCATION_SUCCESS, response: response });
    yield call(getLocations, { query: payload.getQuery });
  } catch (error) {
    yield put({ type: types.UPDATE_LOCATION_FAILURE, error });
  }
}

export function* deleteLocation(payload) {
  try {
    const response = yield call(() =>
      http.delete(`${process.env.REACT_APP_ATLAS_URL}/deleteLocation/${payload.query}`)
    );
    yield put({ type: types.DELETE_LOCATION_SUCCESS, response: response });
    yield call(getLocations, { query: {} });

  } catch (error) {
    yield put({ type: types.DELETE_LOCATION_FAILURE, error });
  }
}

export function* getLocations(payload) {
  try {
    const response = yield call(() =>
      http.get(`${process.env.REACT_APP_ATLAS_URL}/getLocations`, { params: payload.query })
    );
    yield put({ type: types.GET_LOCATIONS_SUCCESS, response: response });
  } catch (error) {
    yield put({ type: types.GET_LOCATIONS_FAILURE, error });
  }
}

export function* getLocation(payload) {
  try {
    const response = yield call(() =>
      http.get(`${process.env.REACT_APP_ATLAS_URL}/getLocation`, payload.query)
    );
    yield put({ type: types.GET_LOCATION_SUCCESS, response: response });
  } catch (error) {
    yield put({ type: types.GET_LOCATION_FAILURE, error });
  }
}

function* locationSaga() {
  yield takeLatest(types.ADD_LOCATION_REQUEST, addLocation);
  yield takeLatest(types.UPDATE_LOCATION_REQUEST, updateLocation);
  yield takeLatest(types.GET_LOCATIONS_REQUEST, getLocations);
  yield takeLatest(types.GET_LOCATION_REQUEST, getLocation);
  yield takeLatest(types.DELETE_LOCATION_REQUEST, deleteLocation);
}

export default locationSaga;
