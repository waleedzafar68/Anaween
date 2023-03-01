import {
    ADD_APPRAISAL_REQUEST,
    UPDATE_APPRAISAL_REQUEST,
    DELETE_APPRAISAL_REQUEST,
    GET_APPRAISALS_REQUEST,
    GET_APPRAISAL_REQUEST,
} from "./types";

export const addAppraisal = (addQuery, getQuery) => {
    return { type: ADD_APPRAISAL_REQUEST, addQuery, getQuery };
};

export const updateAppraisal = (updateQuery, getQuery) => {
    return { type: UPDATE_APPRAISAL_REQUEST, updateQuery, getQuery };
};

export const deleteAppraisal = (query) => {
    return { type: DELETE_APPRAISAL_REQUEST, query };
};

export const getAppraisals = (query) => {
    return { type: GET_APPRAISALS_REQUEST, query };
};

export const getAppraisal = (query) => {
    return { type: GET_APPRAISAL_REQUEST, query };
};
