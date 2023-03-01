import * as types from "./types";
import toast from "react-hot-toast";

const initialState = {
  loading: true,
  errors: null,
  data: null,
};

export const userPropertyReducer = (state = initialState, action) => {
  const response = action.response;
  let toastId = null;
  switch (action.type) {
    case types.ADD_USER_PROPERTY_REQUEST:
      toastId = toast.loading("Loading...");
      return { ...state, toastId: toastId };

    case types.ADD_USER_PROPERTY_SUCCESS:
      toast.success("USER PROPERTY Added!", { id: state.toastId });

      return {
        ...state,
        loading: false,
        addData: response.data,
        errors: null,
      };

    case types.ADD_USER_PROPERTY_FAILURE:
      toast.error(action.error, { id: state.toastId });

      return {
        ...state,
        loading: false,
        errors: action.error,
      };

    case types.UPDATE_USER_PROPERTY_REQUEST:
      toastId = toast.loading("Loading...");
      return { ...state, toastId: toastId };

    case types.UPDATE_USER_PROPERTY_SUCCESS:
      toast.success("USER PROPERTY Updated!", { id: state.toastId });

      return {
        ...state,
        loading: false,
        editData: response.data,
        errors: null,
      };

    case types.UPDATE_USER_PROPERTY_FAILURE:
      toast.error(action.error, { id: state.toastId });

      return {
        ...state,
        loading: false,
        errors: action.error,
      };

    case types.SEARCH_USER_PROPERTY_REQUEST:
      return { ...state, loading: true };

    case types.SEARCH_USER_PROPERTY_SUCCESS:
      return { ...state, loading: false, data: response.data };
    case types.SEARCH_USER_PROPERTY_FAILURE:
      return { ...state, loading: false, errors: action.error };

    case types.GET_USER_PROPERTIES_REQUEST:
      return { ...state, loading: true };

    case types.GET_USER_PROPERTIES_SUCCESS:
      return { ...state, loading: false, data: response.data };
    case types.GET_USER_PROPERTIES_FAILURE:
      return { ...state, loading: false, errors: action.error };

    case types.GET_USER_PROPERTIES_BY_USERID_REQUEST:
      return { ...state, loading: true };

    case types.GET_USER_PROPERTIES_BY_USERID_SUCCESS:
      return { ...state, loading: false, data: response.data };
    case types.GET_USER_PROPERTIES_BY_USERID_FAILURE:
      return { ...state, loading: false, errors: action.error };

    case types.GET_USER_PROPERTY_REQUEST:
      return { ...state, loading: true };

    case types.GET_USER_PROPERTY_SUCCESS:
      return { ...state, loading: false, data: response.data };
    case types.GET_USER_PROPERTY_FAILURE:
      return { ...state, loading: false, errors: action.error };

    default:
      return state;
  }
};
