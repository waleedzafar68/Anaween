import {
    ADD_BLOG_REQUEST,
    UPDATE_BLOG_REQUEST,
    DELETE_BLOG_REQUEST,
    GET_BLOGS_REQUEST,
    GET_BLOG_REQUEST,
} from "./types";

export const addBlog = (addQuery, getQuery) => {
    return { type: ADD_BLOG_REQUEST, addQuery, getQuery };
};

export const updateBlog = (updateQuery, getQuery) => {
    return { type: UPDATE_BLOG_REQUEST, updateQuery, getQuery };
};

export const deleteBlog = (query) => {
    return { type: DELETE_BLOG_REQUEST, query };
};

export const getBlogs = (query) => {
    return { type: GET_BLOGS_REQUEST, query };
};

export const getBlog = (query) => {
    return { type: GET_BLOG_REQUEST, query };
};
