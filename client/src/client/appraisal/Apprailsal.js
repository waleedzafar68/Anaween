import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "../../hooks/form-hook";
import Input from "../../components/appraisal/Input";
import { getUnitTypes } from "../../redux/unit-types/action";
import { addAppraisal } from "../../redux/appraisals/action";

const Apprailsal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const unitTypeReducer = useSelector(state => state.unitTypeReducer);
    const unitTypes = unitTypeReducer.data?.results || []
    const [resetForm, setResetForm] = useState(false);
    const [formState, inputHandler] = useForm({
        PropertyName: '',
        ProjectDeveloper: '',
        AreaSize: '',
        Location: '',
    });

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(addAppraisal(formState, {}));
    }

    useEffect(() => {
        dispatch(getUnitTypes());
    }, [])
    console.log(formState);
    return (
        <div className="px-4 pb-10 sm:px-8 md:px-6 lg:px-16 2xl:px-20">
            <h1 className="text-2xl md:text-4xl font-semibold text-center mb-4 sm:mb-12 my-4 sm:my-6">Appraisal</h1>
            <form className="flex flex-col gap-6 md:gap-10 lg:gap-16" onSubmit={onSubmitHandler}>
                <div className="grid md:grid-cols-3 gap-4 md:gap-7 lg:gap-10">
                    <Input
                        id="PropertyName"
                        label={"Property Name "}
                        name={"PropertyName"}
                        resetForm={resetForm}
                        setResetForm={setResetForm}
                        onInput={inputHandler}
                        hasValue={formState["PropertyName"] !== '' || formState["PropertyName"] !== undefined}
                        required
                    />
                    <Input
                        id="ProjectDeveloper"
                        label={"Developer Name "}
                        name={"ProjectDeveloper"}
                        resetForm={resetForm}
                        setResetForm={setResetForm}
                        onInput={inputHandler}
                        hasValue={formState["ProjectDeveloper"] !== '' && formState["ProjectDeveloper"] !== undefined}
                        required
                    />
                    <Input
                        id="AreaSize"
                        label={"Area Size"}
                        name={"AreaSize"}
                        resetForm={resetForm}
                        setResetForm={setResetForm}
                        onInput={inputHandler}
                        hasValue={formState["AreaSize"] !== '' && formState["AreaSize"] !== undefined}
                        required
                    />
                </div>
                <div className="grid md:grid-cols-3 gap-4 md:gap-7 lg:gap-10">
                    <Input
                        id="Location"
                        label={"Location "}
                        name={"Location"}
                        resetForm={resetForm}
                        setResetForm={setResetForm}
                        onInput={inputHandler}
                        hasValue={formState["Location"] !== '' && formState["Location"] !== undefined}
                        required
                    />
                    <Input
                        id="BoughtFor"
                        label={"Purchase Price"}
                        name={"BoughtFor"}
                        resetForm={resetForm}
                        setResetForm={setResetForm}
                        onInput={inputHandler}
                        hasValue={formState["BoughtFor"] !== '' && formState["BoughtFor"] !== undefined}
                        required
                    />
                    <Input
                        element="select"
                        items={unitTypes}
                        id="UnitType"
                        name={"UnitType"}
                        resetForm={resetForm}
                        setResetForm={setResetForm}
                        onInput={inputHandler}
                    />
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-7 lg:gap-10">
                    <Input
                        element="select"
                        items={[{ id: 0, value: "Appraisal Type" }, { id: 1, value: "For Sale" }, { id: 2, value: "For Rent" }]}
                        id="AppraisalType"
                        name={"AppraisalType"}
                        resetForm={resetForm}
                        setResetForm={setResetForm}
                        onInput={inputHandler}
                    />
                    <Input
                        element="textarea"
                        containerClass="mt-4 md:mt-0"
                        id="Description"
                        placeholder={"Description"}
                        name={"Description"}
                        resetForm={resetForm}
                        setResetForm={setResetForm}
                        onInput={inputHandler}
                        required
                    />
                </div>
                <div className="grid md:grid-cols-3 gap-4 md:gap-7 lg:gap-10">
                    <Input
                        id="UserName"
                        label={"Name"}
                        name={"UserName"}
                        resetForm={resetForm}
                        setResetForm={setResetForm}
                        onInput={inputHandler}
                        hasValue={formState["UserName"] !== '' && formState["UserName"] !== undefined}
                        required
                    />
                    <Input
                        id="Email"
                        label={"Email"}
                        name={"Email"}
                        resetForm={resetForm}
                        setResetForm={setResetForm}
                        onInput={inputHandler}
                        hasValue={formState["Email"] !== '' && formState["Email"] !== undefined}
                        required
                    />
                    <Input
                        id="Phone"
                        label={"Phone"}
                        name={"Phone"}
                        resetForm={resetForm}
                        setResetForm={setResetForm}
                        onInput={inputHandler}
                        hasValue={formState["Phone"] !== '' && formState["Phone"] !== undefined}
                        required
                    />
                </div>
                <button
                    type="submit"
                    id="submitBtn"
                    className="btn mt-2 px-8 w-fit mx-auto text-[1.01rem] border-2 hover:text-[color:var(--primary-color)] border-[color:var(--primary-color)] dark:border-[color:var(--primary-color)] text-black dark:text-white py-[0.38rem] rounded-md outline-none font-open-sans"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Apprailsal;