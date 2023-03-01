import * as types from "./types";
import toast from "react-hot-toast";

const initialState = {
    loading: true,
    errors: null,
    data: null,
};
export const contactReducer = (state = initialState, action) => {
    const response = action.response;
    let toastId = null;
    console.log(action);
    switch (action.type) {
        case types.ADD_CONTACT_REQUEST:
            toastId = toast.loading("Loading...");
            return { ...state, toastId: toastId };

        case types.ADD_CONTACT_SUCCESS:
            toast.success("CONTACT Added!", { id: state.toastId });

            return {
                ...state,
                loading: false,
                addData: response.data,
                errors: null,
            };
        case types.ADD_CONTACT_FAILURE:
            toast.error(action.error, { id: state.toastId });

            return {
                ...state,
                loading: false,
                errors: action.error,
            };

        case types.DELETE_CONTACT_REQUEST:
            toastId = toast.loading("Deleting...");
            return { ...state, toastId: toastId };

        case types.DELETE_CONTACT_SUCCESS:
            toast.success("CONTACT Deleted!", { id: state.toastId });
            return {
                ...state,
                loading: false,
                editData: response.data,
                errors: null,
            };
        case types.DELETE_CONTACT_FAILURE:
            toast.error(action.error?.message || "Deletion Failed", { id: state.toastId });
            return {
                ...state,
                errors: action.error,
            };

        case types.UPDATE_CONTACT_REQUEST:
            toastId = toast.loading("Loading...");
            return { ...state, toastId: toastId };

        case types.UPDATE_CONTACT_SUCCESS:
            toast.success("CONTACT Updated!", { id: state.toastId });

            return {
                ...state,
                loading: false,
                editData: response.data,
                errors: null,
            };
        case types.UPDATE_CONTACT_FAILURE:
            toast.error(action.error, { id: state.toastId });

            return {
                ...state,
                loading: false,
                errors: action.error,
            };

        case types.GET_CONTACTS_REQUEST:
            return { ...state, loading: true };

        case types.GET_CONTACTS_SUCCESS:
            return { ...state, loading: false, data: response.data };
        case types.GET_CONTACTS_FAILURE:
            return { ...state, loading: false, errors: action.error };
        default:
            return state;
    }
};
