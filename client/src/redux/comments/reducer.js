import * as types from "./types";
import toast from "react-hot-toast";

const initialState = {
    loading: true,
    errors: null,
    data: null,
};
export const commentReducer = (state = initialState, action) => {
    const response = action.response;
    let toastId = null;
    console.log(action);
    switch (action.type) {
        case types.ADD_COMMENT_REQUEST:
            toastId = toast.loading("Loading...");
            return { ...state, toastId: toastId };

        case types.ADD_COMMENT_SUCCESS:
            toast.success("COMMENT Added!", { id: state.toastId });

            return {
                ...state,
                loading: false,
                addData: response.data,
                errors: null,
            };
        case types.ADD_COMMENT_FAILURE:
            toast.error(action.error.message, { id: state.toastId });

            return {
                ...state,
                loading: false,
                errors: action.error,
            };

        case types.UPDATE_COMMENT_REQUEST:
            toastId = toast.loading("Loading...");
            return { ...state, toastId: toastId };

        case types.UPDATE_COMMENT_SUCCESS:
            toast.success("COMMENT Updated!", { id: state.toastId });

            return {
                ...state,
                loading: false,
                editData: response.data,
                errors: null,
            };
        case types.UPDATE_COMMENT_FAILURE:
            toast.error(action.error.message, { id: state.toastId });

            return {
                ...state,
                loading: false,
                errors: action.error,
            };

        case types.LIKE_COMMENT_REQUEST:
            toastId = toast.loading("Liking...");
            return { ...state, toastId: toastId };
        case types.LIKE_COMMENT_SUCCESS:
            toast.success("LIKE CLICKED!", { id: state.toastId });
            return {
                ...state,
                loading: false,
                editData: response.data,
                errors: null,
            };
        case types.LIKE_COMMENT_FAILURE:
            toast.error(action.error, { id: state.toastId });
            return {
                ...state,
                loading: false,
                errors: action.error,
            };

        case types.GET_COMMENTS_REQUEST:
            return { ...state, loading: true };

        case types.GET_COMMENTS_SUCCESS:
            return { ...state, loading: false, data: response.data };
        case types.GET_COMMENTS_FAILURE:
            return { ...state, loading: false, errors: action.error };

        default:
            return state;
    }
};
