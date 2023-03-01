import * as types from "./types";
import toast from "react-hot-toast";

const initialState = {
    loading: true,
    errors: null,
    data: null,
};
export const likeReducer = (state = initialState, action) => {
    const response = action.response;
    let toastId = null;
    console.log(action);
    switch (action.type) {
        case types.ADD_LIKE_REQUEST:
            toastId = toast.loading("Loading...");
            return { ...state, toastId: toastId };

        case types.ADD_LIKE_SUCCESS:
            toast.success("LIKE Added!", { id: state.toastId });

            return {
                ...state,
                loading: false,
                addData: response.data,
                errors: null,
            };
        case types.ADD_LIKE_FAILURE:
            toast.error(action.error, { id: state.toastId });

            return {
                ...state,
                loading: false,
                errors: action.error,
            };

        case types.UPDATE_LIKE_REQUEST:
            toastId = toast.loading("Loading...");
            return { ...state, toastId: toastId };

        case types.UPDATE_LIKE_SUCCESS:
            toast.success("LIKE Updated!", { id: state.toastId });

            return {
                ...state,
                loading: false,
                editData: response.data,
                errors: null,
            };
        case types.UPDATE_LIKE_FAILURE:
            toast.error(action.error, { id: state.toastId });

            return {
                ...state,
                loading: false,
                errors: action.error,
            };

        case types.GET_LIKES_BY_USER_ID_REQUEST:
            return { ...state, loading: true };

        case types.GET_LIKES_BY_USER_ID_SUCCESS:
            return { ...state, loading: false, data: response.data };
        case types.GET_LIKES_BY_USER_ID_FAILURE:
            return { ...state, loading: false, errors: action.error };

        case types.GET_LIKES_BY_COMMENT_ID_REQUEST:
            return { ...state, loading: true };

        case types.GET_LIKES_BY_COMMENT_ID_SUCCESS:
            return { ...state, loading: false, data: response.data };
        case types.GET_LIKES_BY_COMMENT_ID_FAILURE:
            return { ...state, loading: false, errors: action.error };

        default:
            return state;
    }
};
