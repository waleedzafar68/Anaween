import { useEffect, useReducer } from "react";

const Input = (props) => {

    const inputReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE":
                return {
                    ...state,
                    value: action.val,
                };
            case "RESET":
                return {
                    value: "",
                };
            default:
                return state;
        }
    };

    const [inputState, dispatch] = useReducer(inputReducer,
        props.initialValue || "",
    );

    const {
        id,
        onInput,
        resetForm,
        setResetForm,
        updateValue,
        setUpdateValue,
    } = props;

    const { value } = inputState;

    useEffect(() => {
        if (resetForm) {
            dispatch({ type: "RESET" });
            setResetForm(false);
        }
        if (updateValue && updateValue.length > 0) {
            dispatch({
                type: "CHANGE",
                val: updateValue,
            });
            setUpdateValue("");
        }
        onInput(id, value);
    }, [
        id,
        value,
        onInput,
        resetForm,
        setResetForm,
        updateValue,
        setUpdateValue,
    ]);

    const onChangeHandler = (e) => {
        dispatch({
            type: "CHANGE",
            val: e.target.value,
        });
    };

    const element =
        props.element === "textarea" ? (
            <textarea
                id={props.id}
                rows={props.rows || 4}
                className={`${props.className} py-2 px-2 text-[1.05rem] w-full bg-transparent outline-none border-2 border-[color:var(--secondary-color)] dark:border-[color:var(--primary-color)] active:border-[color:var(--primary-color)] rounded-md`}
                placeholder={props.placeholder}
                value={props.value || inputState.value}
                required={props.required}
                onChange={props.onChange || onChangeHandler}
            />
        ) : props.element === "select" ? (
            <select
                className={`${props.className} py-2 px-2 md:text-[1.05rem] w-full bg-transparent outline-none border-b-2 border-[color:var(--secondary-color)] dark:border-[color:var(--primary-color)] peer`}
                name={props.name}
                value={props.value || inputState.value}
                onChange={props.onChange || onChangeHandler}
                required={props.required}
                onClick={props.onClick}
            >
                {props.items ? (
                    props.items.map((classData, index) => (
                        <option key={index} value={classData._id} className="bg-white dark:bg-[#212121]">
                            {classData.value ? classData.value
                                : classData.Name ? classData.Name
                                    : classData.Location ? classData.Location
                                        : classData}
                        </option>
                    ))
                ) : (
                    <option disabled>No data to show</option>
                )}
            </select>
        ) : (
            <input
                name={props.name}
                id={props.id}
                type={props.inputType || "text"}
                className={`${props.className} block py-1 md:py-2 pt-5 px-2 w-full text-base md:text-[1.05rem] bg-transparent appearance-none outline-none border-b-2 border-[color:var(--primary-color)] peer ring-0`}
                required={props.required}
                value={props.value || inputState.value}
                onChange={props.onChange || onChangeHandler}
                placeholder={props.placeholder || ""}
            />
        );

    return (
        <div
            className={`${props.containerClass} relative flex flex-col justify-end gap-[0.19rem] text-[0.78rem]`}
            tabIndex={1}
        >
            {" "}
            {element}
            {props.element !== "select" && props.element !== "textarea" &&
                <label
                    htmlFor={props.id}
                    className={`${props.labelClass} ${props.required &&
                        "after:content-['*'] after:ml-0.5 after:align-middle after:text-[color:var(--secondary-color)] after:font-semibold"
                        } inline md:text-lg absolute left-2 top-1/2 ${props.hasValue ? '-translate-y-7 md:-translate-y-9' : '-translate-y-1/2'}  transition-all duration-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7 md:peer-focus:-translate-y-9 peer-focus:text-[color:var(--gray)] peer-focus:text-[0.8rem] md:peer-focus:text-base cursor-text`}
                >
                    {props.label}
                </label>
            }
        </div>

    );
}

export default Input;