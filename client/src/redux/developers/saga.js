import { takeLatest, put, call } from "redux-saga/effects";
import http from "../../utils/http";
import * as types from "./types";

export function* addDeveloper({ addQuery, getQuery }) {
  try {
    const response = yield call(() =>
      http.post(`${process.env.REACT_APP_ATLAS_URL}/addProjectDeveloper`, addQuery)
    );
    yield put({ type: types.ADD_DEVELOPER_SUCCESS, response: response });
    yield call(getDevelopers, { query: getQuery });
  } catch (error) {
    yield put({ type: types.ADD_DEVELOPER_FAILURE, error });
  }
}

export function* updateDeveloper(payload) {
  try {
    const response = yield call(() =>
      http.put(`${process.env.REACT_APP_ATLAS_URL}/updateProjectDeveloper/${payload.updateQuery.id}`, payload.updateQuery.data)
    );
    yield put({ type: types.UPDATE_DEVELOPER_SUCCESS, response: response });
    yield call(getDevelopers, { query: payload.getQuery });
  } catch (error) {
    yield put({ type: types.UPDATE_DEVELOPER_FAILURE, error });
  }
}

export function* deleteDeveloper(payload) {
  try {
    const response = yield call(() =>
      http.delete(`${process.env.REACT_APP_ATLAS_URL}/deleteProjectDeveloper/${payload.query}`)
    );
    yield put({ type: types.DELETE_DEVELOPER_SUCCESS, response: response });
    yield call(getDevelopers, { query: {} });

  } catch (error) {
    yield put({ type: types.DELETE_DEVELOPER_FAILURE, error });
  }
}

export function* getDevelopers(payload) {
  try {
    const response = yield call(() =>
      http.get(`${process.env.REACT_APP_ATLAS_URL}/getProjectDevelopers`, { params: payload.query })
    );
    yield put({ type: types.GET_DEVELOPERS_SUCCESS, response: response });
  } catch (error) {
    yield put({ type: types.GET_DEVELOPERS_FAILURE, error });
  }
}

export function* getDeveloper(payload) {
  try {
    const response = yield call(() =>
      http.get(`${process.env.REACT_APP_ATLAS_URL}/getProjectDeveloper`, payload.query)
    );
    yield put({ type: types.GET_DEVELOPER_SUCCESS, response: response });
  } catch (error) {
    yield put({ type: types.GET_DEVELOPER_FAILURE, error });
  }
}

function* developerSaga() {
  yield takeLatest(types.ADD_DEVELOPER_REQUEST, addDeveloper);
  yield takeLatest(types.UPDATE_DEVELOPER_REQUEST, updateDeveloper);
  yield takeLatest(types.GET_DEVELOPERS_REQUEST, getDevelopers);
  yield takeLatest(types.GET_DEVELOPER_REQUEST, getDeveloper);
  yield takeLatest(types.DELETE_DEVELOPER_REQUEST, deleteDeveloper);
}

export default developerSaga;
