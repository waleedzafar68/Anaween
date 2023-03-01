import { takeLatest, put, call } from "redux-saga/effects";
import http from "../../utils/http";
import * as types from "./types";

export function* addAmenity({ addQuery, getQuery }) {
  try {
    const response = yield call(() =>
      http.post(`${process.env.REACT_APP_ATLAS_URL}/addAmenity`, addQuery)
    );
    yield put({ type: types.ADD_AMENITY_SUCCESS, response: response });
    yield call(getAmenities, { query: getQuery });
  } catch (error) {
    yield put({ type: types.ADD_AMENITY_FAILURE, error });
  }
}

export function* updateAmenity(payload) {
  try {
    const response = yield call(() =>
      http.put(`${process.env.REACT_APP_ATLAS_URL}/updateAmenity/${payload.updateQuery.id}`, payload.updateQuery.data)
    );
    yield put({ type: types.UPDATE_AMENITY_SUCCESS, response: response });
    yield call(getAmenities, { query: payload.getQuery });
  } catch (error) {
    yield put({ type: types.UPDATE_AMENITY_FAILURE, error });
  }
}

export function* deleteAmenity(payload) {
  try {
    const response = yield call(() =>
      http.delete(`${process.env.REACT_APP_ATLAS_URL}/deleteAmenity/${payload.query}`)
    );
    yield put({ type: types.DELETE_AMENITY_SUCCESS, response: response });
    yield call(getAmenities, { query: {} });

  } catch (error) {
    yield put({ type: types.DELETE_AMENITY_FAILURE, error });
  }
}

export function* getAmenities(payload) {
  try {
    const response = yield call(() =>
      http.get(`${process.env.REACT_APP_ATLAS_URL}/getAmenities`, { params: payload.query })
    );
    yield put({ type: types.GET_AMENITIES_SUCCESS, response: response });
  } catch (error) {
    yield put({ type: types.GET_AMENITIES_FAILURE, error });
  }
}

export function* getAmenity(payload) {
  try {
    const response = yield call(() =>
      http.get(`${process.env.REACT_APP_ATLAS_URL}/getAmenity`, payload.query)
    );
    yield put({ type: types.GET_AMENITY_SUCCESS, response: response });
  } catch (error) {
    yield put({ type: types.GET_AMENITY_FAILURE, error });
  }
}

function* amenitySaga() {
  yield takeLatest(types.ADD_AMENITY_REQUEST, addAmenity);
  yield takeLatest(types.UPDATE_AMENITY_REQUEST, updateAmenity);
  yield takeLatest(types.GET_AMENITIES_REQUEST, getAmenities);
  yield takeLatest(types.GET_AMENITY_REQUEST, getAmenity);
  yield takeLatest(types.DELETE_AMENITY_REQUEST, deleteAmenity);
}

export default amenitySaga;
