import * as types from "./types";
import toast from "react-hot-toast";

const initialState = {
  loading: true,
  errors: null,
  data: null,
};

export const propertyReducer = (state = initialState, action) => {
  const response = action.response;
  let toastId = null;
  switch (action.type) {
    case types.ADD_PROPERTY_REQUEST:
      toastId = toast.loading("Loading...");
      return { ...state, toastId: toastId };

    case types.ADD_PROPERTY_SUCCESS:
      toast.success("PROPERTY Added!", { id: state.toastId });

      return {
        ...state,
        loading: false,
        addData: response.data,
        errors: null,
      };

    case types.ADD_PROPERTY_FAILURE:
      toast.error('Could Not Add Property', { id: state.toastId });
      return {
        ...state,
        loading: false,
        errors: action.error.error,
      };

    case types.UPDATE_PROPERTY_REQUEST:
      toastId = toast.loading("Loading...");
      return { ...state, toastId: toastId };

    case types.UPDATE_PROPERTY_SUCCESS:
      toast.success("PROPERTY Updated!", { id: state.toastId });

      return {
        ...state,
        loading: false,
        editData: response.data,
        errors: null,
      };

    case types.UPDATE_PROPERTY_FAILURE:
      toast.error(action.error, { id: state.toastId });

      return {
        ...state,
        loading: false,
        errors: action.error,
      };

    case types.SEARCH_PROPERTY_REQUEST:
      return { ...state, loading: true };

    case types.SEARCH_PROPERTY_SUCCESS:
      return { ...state, loading: false, data: response.data };
    case types.SEARCH_PROPERTY_FAILURE:
      return { ...state, loading: false, errors: action.error };

    case types.GET_PROPERTIES_REQUEST:
      return { ...state, loading: true };

    case types.GET_PROPERTIES_SUCCESS:
      return { ...state, loading: false, data: response.data };
    case types.GET_PROPERTIES_FAILURE:
      return { ...state, loading: false, errors: action.error };

    case types.GET_PROPERTIES_BY_USERID_REQUEST:
      return { ...state, loading: true };

    case types.GET_PROPERTIES_BY_USERID_SUCCESS:
      return { ...state, loading: false, data: response.data };
    case types.GET_PROPERTIES_BY_USERID_FAILURE:
      return { ...state, loading: false, errors: action.error };

    case types.GET_PROPERTY_REQUEST:
      return { ...state, loading: true };

    case types.GET_PROPERTY_SUCCESS:
      return { ...state, loading: false, data: response.data };
    case types.GET_PROPERTY_FAILURE:
      return { ...state, loading: false, errors: action.error };

    default:
      return state;
  }
};
