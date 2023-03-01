import {
  SEARCH_USER_PROPERTY_REQUEST,
  ADD_USER_PROPERTY_REQUEST,
  UPDATE_USER_PROPERTY_REQUEST,
  DELETE_USER_PROPERTY_REQUEST,
  GET_USER_PROPERTIES_REQUEST,
  GET_USER_PROPERTIES_BY_USERID_REQUEST,
  GET_USER_PROPERTY_REQUEST,
} from "./types";

export const searchUserProperty = (query) => {
  return { type: SEARCH_USER_PROPERTY_REQUEST, query };
};

export const addUserProperty = (addQuery, getQuery) => {
  return { type: ADD_USER_PROPERTY_REQUEST, addQuery, getQuery };
};

export const updateUserProperty = (updateQuery, getQuery) => {
  return { type: UPDATE_USER_PROPERTY_REQUEST, updateQuery, getQuery };
};

export const deleteUserProperty = (query) => {
  return { type: DELETE_USER_PROPERTY_REQUEST, query };
};

export const getUserProperties = (query) => {
  return { type: GET_USER_PROPERTIES_REQUEST, query };
};

export const getUserPropertiesByUserId = (query) => {
  return { type: GET_USER_PROPERTIES_BY_USERID_REQUEST, query };
};

export const getUserProperty = (query) => {
  return { type: GET_USER_PROPERTY_REQUEST, query };
};
