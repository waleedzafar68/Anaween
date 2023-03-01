import {
  SEARCH_PROPERTY_REQUEST,
  ADD_PROPERTY_REQUEST,
  UPDATE_PROPERTY_REQUEST,
  DELETE_PROPERTY_REQUEST,
  GET_PROPERTIES_REQUEST,
  GET_PROPERTIES_BY_USERID_REQUEST,
  GET_PROPERTY_REQUEST,
} from "./types";

export const searchProperty = (query) => {
  return { type: SEARCH_PROPERTY_REQUEST, query };
};

export const addProperty = (addQuery, getQuery) => {
  return { type: ADD_PROPERTY_REQUEST, addQuery, getQuery };
};

export const updateProperty = (updateQuery, getQuery) => {
  return { type: UPDATE_PROPERTY_REQUEST, updateQuery, getQuery };
};

export const deleteProperty = (query) => {
  return { type: DELETE_PROPERTY_REQUEST, query };
};

export const getProperties = (query) => {
  return { type: GET_PROPERTIES_REQUEST, query };
};

export const getPropertiesByUserId = (query) => {
  return { type: GET_PROPERTIES_BY_USERID_REQUEST, query };
};

export const getProperty = (query) => {
  return { type: GET_PROPERTY_REQUEST, query };
};
