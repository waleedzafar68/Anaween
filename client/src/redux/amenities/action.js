import {
  ADD_AMENITY_REQUEST,
  UPDATE_AMENITY_REQUEST,
  DELETE_AMENITY_REQUEST,
  GET_AMENITIES_REQUEST,
  GET_AMENITY_REQUEST,
} from "./types";

export const addAmenity = (addQuery, getQuery) => {
  return { type: ADD_AMENITY_REQUEST, addQuery, getQuery };
};

export const updateAmenity = (updateQuery, getQuery) => {
  return { type: UPDATE_AMENITY_REQUEST, updateQuery, getQuery };
};

export const deleteAmenity = (query) => {
  return { type: DELETE_AMENITY_REQUEST, query };
};

export const getAmenities = (query) => {
  return { type: GET_AMENITIES_REQUEST, query };
};

export const getAmenity = (query) => {
  return { type: GET_AMENITY_REQUEST, query };
};
