import * as types from "./types";
import toast from "react-hot-toast";

const initialState = {
    loading: true,
    errors: null,
    data: null,
};
export const appraisalReducer = (state = initialState, action) => {
    const response = action.response;
    let toastId = null;
    console.log(action);
    switch (action.type) {
        case types.ADD_APPRAISAL_REQUEST:
            toastId = toast.loading("Loading...");
            return { ...state, toastId: toastId };

        case types.ADD_APPRAISAL_SUCCESS:
            toast.success("APPRAISAL Added!", { id: state.toastId });

            return {
                ...state,
                loading: false,
                addData: response.data,
                errors: null,
            };
        case types.ADD_APPRAISAL_FAILURE:
            toast.error(action.error, { id: state.toastId });

            return {
                ...state,
                loading: false,
                errors: action.error,
            };

        case types.UPDATE_APPRAISAL_REQUEST:
            toastId = toast.loading("Loading...");
            return { ...state, toastId: toastId };

        case types.UPDATE_APPRAISAL_SUCCESS:
            toast.success("APPRAISAL Updated!", { id: state.toastId });

            return {
                ...state,
                loading: false,
                editData: response.data,
                errors: null,
            };
        case types.UPDATE_APPRAISAL_FAILURE:
            toast.error(action.error, { id: state.toastId });

            return {
                ...state,
                loading: false,
                errors: action.error,
            };

        case types.GET_APPRAISALS_REQUEST:
            return { ...state, loading: true };

        case types.GET_APPRAISALS_SUCCESS:
            return { ...state, loading: false, data: response.data };
        case types.GET_APPRAISALS_FAILURE:
            return { ...state, loading: false, errors: action.error };
        default:
            return state;
    }
};
