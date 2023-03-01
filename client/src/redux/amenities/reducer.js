import * as types from "./types";
import toast from "react-hot-toast";

const initialState = {
  loading: true,
  errors: null,
  data: null,
};
export const amenityReducer = (state = initialState, action) => {
  const response = action.response;
  let toastId = null;
  console.log(action);
  switch (action.type) {
    case types.ADD_AMENITY_REQUEST:
      toastId = toast.loading("Loading...");
      return { ...state, toastId: toastId };

    case types.ADD_AMENITY_SUCCESS:
      toast.success("AMENITY Added!", { id: state.toastId });

      return {
        ...state,
        loading: false,
        addData: response.data,
        errors: null,
      };
    case types.ADD_AMENITY_FAILURE:
      toast.error(action.error, { id: state.toastId });

      return {
        ...state,
        loading: false,
        errors: action.error,
      };

    case types.UPDATE_AMENITY_REQUEST:
      toastId = toast.loading("Loading...");
      return { ...state, toastId: toastId };

    case types.UPDATE_AMENITY_SUCCESS:
      toast.success("AMENITY Updated!", { id: state.toastId });

      return {
        ...state,
        loading: false,
        editData: response.data,
        errors: null,
      };
    case types.UPDATE_AMENITY_FAILURE:
      toast.error(action.error, { id: state.toastId });

      return {
        ...state,
        loading: false,
        errors: action.error,
      };

    case types.GET_AMENITIES_REQUEST:
      return { ...state, loading: true };

    case types.GET_AMENITIES_SUCCESS:
      return { ...state, loading: false, data: response.data };
    case types.GET_AMENITIES_FAILURE:
      return { ...state, loading: false, errors: action.error };
    default:
      return state;
  }
};
