import {
    ADD_UNIT_TYPE_REQUEST,
    UPDATE_UNIT_TYPE_REQUEST,
    DELETE_UNIT_TYPE_REQUEST,
    GET_UNIT_TYPES_REQUEST,
    GET_UNIT_TYPE_REQUEST,
  } from "./types";
  
  export const addUnitType = (addQuery, getQuery) => {
    return { type: ADD_UNIT_TYPE_REQUEST, addQuery, getQuery };
  };
  
  export const updateUnitType = (updateQuery, getQuery) => {
    return { type: UPDATE_UNIT_TYPE_REQUEST, updateQuery, getQuery };
  };
  
  export const deleteUnitType = (query) => {
    return { type: DELETE_UNIT_TYPE_REQUEST, query };
  };
  
  export const getUnitTypes = (query) => {
    return { type: GET_UNIT_TYPES_REQUEST, query };
  };
  
  export const getUnitType = (query) => {
    return { type: GET_UNIT_TYPE_REQUEST, query };
  };
  