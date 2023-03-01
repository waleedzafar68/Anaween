import {
    ADD_USER_REQUEST,
    UPDATE_USER_REQUEST,
    UPDATE_USER_STATUS_REQUEST,
    DELETE_USER_REQUEST,
    GET_USERS_REQUEST,
    GET_USER_REQUEST,
} from "./types";

export const addUser = (addQuery, getQuery) => {
    return { type: ADD_USER_REQUEST, addQuery, getQuery };
};

export const updateUser = (updateQuery, getQuery) => {
    return { type: UPDATE_USER_REQUEST, updateQuery, getQuery };
};

export const updateUserStatus = (updateQuery, getQuery) => {
    return { type: UPDATE_USER_STATUS_REQUEST, updateQuery, getQuery };
};

export const deleteUser = (query) => {
    return { type: DELETE_USER_REQUEST, query };
};

export const getUsers = (query) => {
    return { type: GET_USERS_REQUEST, query };
};

export const getUser = (query) => {
    return { type: GET_USER_REQUEST, query };
};
