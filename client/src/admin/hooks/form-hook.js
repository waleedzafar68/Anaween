import { useReducer, useCallback } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        [action.inputId]: action.value,
      };
    case "SET_DATA":
      return {
        state: action.value,
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs) => {
  const [formState, dispatch] = useReducer(formReducer, {});

  const inputHandler = useCallback((id, value) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      inputId: id,
    });
  }, []);

  const setFormData = useCallback((inputData) => {
    dispatch({
      type: "SET_DATA",
      value: inputData,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
