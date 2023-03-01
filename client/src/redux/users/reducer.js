import * as types from "./types";
import toast from "react-hot-toast";

const initialState = {
    loading: true,
    errors: null,
    data: null,
};
export const userReducer = (state = initialState, action) => {
    const response = action.response;
    let toastId = null;
    // console.log(action);
    switch (action.type) {
        case types.ADD_USER_REQUEST:
            toastId = toast.loading("Loading...");
            return { ...state, toastId: toastId };

        case types.ADD_USER_SUCCESS:
            toast.success("USER Registered!", { id: state.toastId });
            console.log(response.data);
            if (response.data) {
                sessionStorage.setItem('userId', response.data);
            }
            window.location.replace('/');
            return {
                ...state,
                loading: false,
                addData: response.data,
                errors: null,
            };
        case types.ADD_USER_FAILURE:
            toast.error(action.error?.message || "Registerated Failed", { id: state.toastId });
            return {
                ...state,
                loading: false,
                errors: action.error,
            };

        case types.DELETE_USER_REQUEST:
            toastId = toast.loading("Deleting...");
            return { ...state, toastId: toastId };

        case types.DELETE_USER_SUCCESS:
            toast.success("USER Deleted!", { id: state.toastId });
            return {
                ...state,
                loading: false,
                editData: response.data,
                errors: null,
            };
        case types.DELETE_USER_FAILURE:
            toast.error(action.error?.message || "Deletion Failed", { id: state.toastId });
            return {
                ...state,
                errors: action.error,
            };

        case types.UPDATE_USER_REQUEST:
            toastId = toast.loading("Loading...");
            return { ...state, toastId: toastId };

        case types.UPDATE_USER_SUCCESS:
            toast.success("USER Updated!", { id: state.toastId });

            return {
                ...state,
                loading: false,
                editData: response.data,
                errors: null,
            };
        case types.UPDATE_USER_FAILURE:
            toast.error(action.error, { id: state.toastId });

            return {
                ...state,
                loading: false,
                errors: action.error,
            };

        case types.UPDATE_USER_STATUS_REQUEST:
            toastId = toast.loading("Loading...");
            return { ...state, toastId: toastId };

        case types.UPDATE_USER_STATUS_SUCCESS:
            toast.success("USER Status Updated!", { id: state.toastId });

            return {
                ...state,
                loading: false,
                editData: response.data,
                errors: null,
            };
        case types.UPDATE_USER_STATUS_FAILURE:
            toast.error(action.error, { id: state.toastId });

            return {
                ...state,
                loading: false,
                errors: action.error,
            };

        case types.GET_USER_REQUEST:
            return { ...state, loading: true };

        case types.GET_USER_SUCCESS:
            return { ...state, loading: false, data: response.data };
        case types.GET_USER_FAILURE:
            return { ...state, loading: false, errors: action.error };

        case types.GET_USERS_REQUEST:
            return { ...state, loading: true };

        case types.GET_USERS_SUCCESS:
            return { ...state, loading: false, data: response.data };
        case types.GET_USERS_FAILURE:
            return { ...state, loading: false, errors: action.error };
        default:
            return state;
    }
};
