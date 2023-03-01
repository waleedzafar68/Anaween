import {
    ADD_COMMENT_REQUEST,
    UPDATE_COMMENT_REQUEST,
    DELETE_COMMENT_REQUEST,
    GET_COMMENTS_REQUEST,
    GET_COMMENT_REQUEST,
    LIKE_COMMENT_REQUEST,
} from "./types";

export const addComment = (addQuery, getQuery) => {
    return { type: ADD_COMMENT_REQUEST, addQuery, getQuery };
};

export const updateComment = (updateQuery, getQuery) => {
    return { type: UPDATE_COMMENT_REQUEST, updateQuery, getQuery };
};

export const deleteComment = (query, getQuery) => {
    return { type: DELETE_COMMENT_REQUEST, query, getQuery };
};

export const getComments = (query) => {
    return { type: GET_COMMENTS_REQUEST, query };
};

export const getComment = (query) => {
    return { type: GET_COMMENT_REQUEST, query };
};

export const likeComment = (addQuery, getQuery) => {
    return { type: LIKE_COMMENT_REQUEST, addQuery, getQuery };
};
