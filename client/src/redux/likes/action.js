import {
    ADD_LIKE_REQUEST,
    UPDATE_LIKE_REQUEST,
    DELETE_LIKE_REQUEST,
    GET_LIKES_BY_USER_ID_REQUEST,
    GET_LIKES_BY_COMMENT_ID_REQUEST,
} from "./types";

export const addLike = (addQuery, getQuery) => {
    return { type: ADD_LIKE_REQUEST, addQuery, getQuery };
};

export const updateLike = (updateQuery, getQuery) => {
    return { type: UPDATE_LIKE_REQUEST, updateQuery, getQuery };
};

export const deleteLike = (query) => {
    return { type: DELETE_LIKE_REQUEST, query };
};

export const getLikesByUserId = (query) => {
    return { type: GET_LIKES_BY_USER_ID_REQUEST, query };
};

export const getLikesByCommentId = (query) => {
    return { type: GET_LIKES_BY_COMMENT_ID_REQUEST, query };
};
