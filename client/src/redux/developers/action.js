import {
  ADD_DEVELOPER_REQUEST,
  UPDATE_DEVELOPER_REQUEST,
  DELETE_DEVELOPER_REQUEST,
  GET_DEVELOPERS_REQUEST,
  GET_DEVELOPER_REQUEST,
} from "./types";

export const addDeveloper = (addQuery, getQuery) => {
  return { type: ADD_DEVELOPER_REQUEST, addQuery, getQuery };
};

export const updateDeveloper = (updateQuery, getQuery) => {
  return { type: UPDATE_DEVELOPER_REQUEST, updateQuery, getQuery };
};

export const deleteDeveloper = (query) => {
  return { type: DELETE_DEVELOPER_REQUEST, query };
};

export const getDevelopers = (query) => {
  return { type: GET_DEVELOPERS_REQUEST, query };
};

export const getDeveloper = (query) => {
  return { type: GET_DEVELOPER_REQUEST, query };
};
