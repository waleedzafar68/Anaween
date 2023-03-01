import * as types from "./types";
import toast from "react-hot-toast";

const initialState = {
    loading: true,
    errors: null,
    data: null,
};

export const notificationReducer = (state = initialState, action) => {
    const response = action.response;
    let toastId = null;
    console.log(action);
    switch (action.type) {

        case types.UPDATE_NOTIFICATION_REQUEST:
            toastId = toast.loading("Loading...");
            return { ...state, toastId: toastId };

        case types.UPDATE_NOTIFICATION_SUCCESS:
            toast.success("NOTIFICATION Updated!", { id: state.toastId });

            return {
                ...state,
                loading: false,
                editData: response.data,
                errors: null,
            };
        case types.UPDATE_NOTIFICATION_FAILURE:
            toast.error(action.error, { id: state.toastId });

            return {
                ...state,
                loading: false,
                errors: action.error,
            };

        case types.UPDATE_NOTIFICATION_STATUS_REQUEST:
            return { ...state, loading: true };

        case types.UPDATE_NOTIFICATION_STATUS_SUCCESS:
            return { ...state, loading: false, data: response.data };
        case types.UPDATE_NOTIFICATION_STATUS_FAILURE:
            return { ...state, loading: false, errors: action.error };

        case types.GET_NOTIFICATIONS_BY_USERID_REQUEST:
            return { ...state, loading: true };

        case types.GET_NOTIFICATIONS_BY_USERID_SUCCESS:
            return { ...state, loading: false, data: response.data };
        case types.GET_NOTIFICATIONS_BY_USERID_FAILURE:
            return { ...state, loading: false, errors: action.error };


        default:
            return state;
    }
};
