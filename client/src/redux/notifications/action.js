import {
    GET_NOTIFICATIONS_BY_USERID_REQUEST,
    UPDATE_NOTIFICATION_REQUEST,
    UPDATE_NOTIFICATION_STATUS_REQUEST,
    DELETE_NOTIFICATION_REQUEST,
} from "./types";



export const getNotificationsByUserId = (query) => {
    return { type: GET_NOTIFICATIONS_BY_USERID_REQUEST, query };
};

export const updateNotification = (updateQuery, getQuery) => {
    return { type: UPDATE_NOTIFICATION_REQUEST, updateQuery, getQuery };
};

export const updateNotificationStatus = (updateQuery, getQuery) => {
    return { type: UPDATE_NOTIFICATION_STATUS_REQUEST, updateQuery, getQuery };
};

export const deleteNotification = (query) => {
    return { type: DELETE_NOTIFICATION_REQUEST, query };
};