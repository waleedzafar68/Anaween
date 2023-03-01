import {
    ADD_REPLY_REQUEST,
    UPDATE_REPLY_REQUEST,
    DELETE_REPLY_REQUEST,
    GET_REPLIES_REQUEST,
    GET_REPLY_REQUEST,
} from "./types";

export const addReply = (addQuery, getQuery) => {
    return { type: ADD_REPLY_REQUEST, addQuery, getQuery };
};

export const updateReply = (updateQuery, getQuery) => {
    return { type: UPDATE_REPLY_REQUEST, updateQuery, getQuery };
};

export const deleteReply = (query, getQuery) => {
    return { type: DELETE_REPLY_REQUEST, query, getQuery };
};

export const getReplies = (query) => {
    return { type: GET_REPLIES_REQUEST, query };
};

export const getReply = (query) => {
    return { type: GET_REPLY_REQUEST, query };
};
