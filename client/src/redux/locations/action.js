import {
    ADD_LOCATION_REQUEST,
    UPDATE_LOCATION_REQUEST,
    DELETE_LOCATION_REQUEST,
    GET_LOCATIONS_REQUEST,
    GET_LOCATION_REQUEST,
  } from "./types";
  
  export const addLocation = (addQuery, getQuery) => {
    return { type: ADD_LOCATION_REQUEST, addQuery, getQuery };
  };
  
  export const updateLocation = (updateQuery, getQuery) => {
    return { type: UPDATE_LOCATION_REQUEST, updateQuery, getQuery };
  };
  
  export const deleteLocation = (query) => {
    return { type: DELETE_LOCATION_REQUEST, query };
  };
  
  export const getLocations = (query) => {
    return { type: GET_LOCATIONS_REQUEST, query };
  };
  
  export const getLocation = (query) => {
    return { type: GET_LOCATION_REQUEST, query };
  };
  