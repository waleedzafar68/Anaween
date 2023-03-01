import * as types from "./types";
import toast from "react-hot-toast";

const initialState = {
  loading: true,
  errors: null,
  data: null,
};
export const locationReducer = (state = initialState, action) => {
  const response = action.response;
  let toastId = null;
  console.log(action);
  switch (action.type) {
    case types.ADD_LOCATION_REQUEST:
      toastId = toast.loading("Loading...");
      return { ...state, toastId: toastId };

    case types.ADD_LOCATION_SUCCESS:
      toast.success("LOCATION Added!", { id: state.toastId });

      return {
        ...state,
        loading: false,
        addData: response.data,
        errors: null,
      };
    case types.ADD_LOCATION_FAILURE:
      toast.error(action.error, { id: state.toastId });

      return {
        ...state,
        loading: false,
        errors: action.error,
      };

    case types.UPDATE_LOCATION_REQUEST:
      toastId = toast.loading("Loading...");
      return { ...state, toastId: toastId };

    case types.UPDATE_LOCATION_SUCCESS:
      toast.success("LOCATION Updated!", { id: state.toastId });

      return {
        ...state,
        loading: false,
        editData: response.data,
        errors: null,
      };
    case types.UPDATE_LOCATION_FAILURE:
      toast.error(action.error, { id: state.toastId });

      return {
        ...state,
        loading: false,
        errors: action.error,
      };

    case types.GET_LOCATIONS_REQUEST:
      return { ...state, loading: true };

    case types.GET_LOCATIONS_SUCCESS:
      return { ...state, loading: false, data: response.data };
    case types.GET_LOCATIONS_FAILURE:
      return { ...state, loading: false, errors: action.error };
    default:
      return state;
  }
};
