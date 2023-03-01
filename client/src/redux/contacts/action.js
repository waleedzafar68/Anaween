import {
    ADD_CONTACT_REQUEST,
    UPDATE_CONTACT_REQUEST,
    DELETE_CONTACT_REQUEST,
    GET_CONTACTS_REQUEST,
    GET_CONTACT_REQUEST,
} from "./types";

export const addContact = (addQuery, getQuery) => {
    return { type: ADD_CONTACT_REQUEST, addQuery, getQuery };
};

export const updateContact = (updateQuery, getQuery) => {
    return { type: UPDATE_CONTACT_REQUEST, updateQuery, getQuery };
};

export const deleteContact = (query) => {
    return { type: DELETE_CONTACT_REQUEST, query };
};

export const getContacts = (query) => {
    return { type: GET_CONTACTS_REQUEST, query };
};

export const getContact = (query) => {
    return { type: GET_CONTACT_REQUEST, query };
};
