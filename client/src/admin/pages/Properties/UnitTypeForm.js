import { useState, useEffect, useCallback } from "react";
import http from "../../../utils/http";
import toast from "react-hot-toast";

import FormButton from "../../components/UI/FormButton";

const UnitTypeForm = ({
  unitType,
  removeUnitFormHandler,
  index,
  unitTypeClick,
}) => {
  const [unitTypes, setUnitTypes] = useState(null);

  // To rerender component when Any input changes
  const [rerender, setRerender] = useState(false);

  const [unitName, setUnitName] = useState(unitType.UnitName);
  const [areaFrom, setAreaFrom] = useState(unitType.AreaFrom);
  const [areaTo, setAreaTo] = useState(unitType.AreaTo);
  const [price, setPrice] = useState(unitType.Price);

  const getUnitTypes = useCallback(() => {
    http
      .get(`${process.env.REACT_APP_ATLAS_URL}/getUnitTypes/`)
      .then((response) => {
        if (response.status === 200) {
          const results = response?.data?.results;
          setUnitTypes(results);
        } else toast.error(response?.data?.error?.message);
      })
      .catch((err) => toast.error(err.message));
  }, []);

  useEffect(() => {
    getUnitTypes();
  }, [getUnitTypes]);

  // If edit option is click from viewAllProperties
  useEffect(() => {
    setUnitName(unitType.UnitName);
    setAreaFrom(unitType.AreaFrom);
    setAreaTo(unitType.AreaTo);
    setPrice(unitType.Price);
  }, [unitType.AreaFrom, unitType.AreaTo, unitType.UnitName, unitType.Price]);

  const changeHandler = (e) => {
    setRerender((prev) => !prev);
    unitType[e.target.name] = e.target.value;
  };

  return (
    unitTypes && (
      <div className="grid grid-cols-6  items-end justify-center gap-4 w-full">
        <div className=" flex flex-col gap-[0.18rem] text-[0.7rem]">
          <label className="font-semibold ">Unit Type</label>
          <select
            className={` py-[0.18rem] px-2 outline-none border border-gray-300 focus:border-[color:var(--red-color)] active:border-[color:var(--red-color)] w-full`}
            id={"unitType"}
            label={"Unit Type"}
            name={"UnitType"}
            onChange={changeHandler}
            required
            defaultValue={
              unitType.UnitType &&
              unitTypes.find((ut) => ut._id === unitType.UnitType)._id
            }
          >
            <option>Select</option>
            {unitTypes ? (
              unitTypes.map((UnitType, index) => (
                <option key={index} value={UnitType._id}>
                  {UnitType.Name}
                </option>
              ))
            ) : (
              <option disabled>No Data to select</option>
            )}
          </select>
        </div>

        <div className=" flex flex-col gap-[0.18rem] text-[0.7rem]">
          <label className="font-semibold ">Unit Name</label>
          <input
            value={unitName}
            type={"text"}
            className={` py-[0.18rem] px-2 outline-none border border-gray-300 focus:border-[color:var(--red-color)] active:border-[color:var(--red-color)] w-full`}
            id={"UnitName"}
            label={"Unit Name"}
            name={"UnitName"}
            required
            onChange={changeHandler}
          />
        </div>
        <div className=" flex flex-col gap-[0.18rem] text-[0.7rem]">
          <label className="font-semibold ">Area From</label>
          <input
            value={areaFrom}
            type={"text"}
            className={` py-[0.18rem] px-2 outline-none border border-gray-300 focus:border-[color:var(--red-color)] active:border-[color:var(--red-color)] w-full`}
            id={"AreaFrom"}
            label={"Area From"}
            name={"AreaFrom"}
            onChange={changeHandler}
          />
        </div>
        <div className=" flex flex-col gap-[0.18rem] text-[0.7rem]">
          <label className="font-semibold ">Area To</label>
          <input
            type={"text"}
            value={areaTo}
            className={` py-[0.18rem] px-2 outline-none border border-gray-300 focus:border-[color:var(--red-color)] active:border-[color:var(--red-color)] w-full`}
            id={"AreaTo"}
            label={"Area To"}
            name={"AreaTo"}
            onChange={changeHandler}
          />
        </div>
        <div className=" flex flex-col gap-[0.18rem] text-[0.7rem]">
          <label className="font-semibold ">Price</label>
          <input
            type={"text"}
            value={price}
            className={` py-[0.18rem] px-2 outline-none border border-gray-300 focus:border-[color:var(--red-color)] active:border-[color:var(--red-color)] w-full`}
            id={"Price"}
            label={"Price"}
            name={"Price"}
            onChange={changeHandler}
          />
        </div>

        <FormButton
          buttonclassName="!px-2"
          containerclassName="!border-none !p-0 !w-fit justify-self-center"
          // disabled={props.unitFormLength > 0 ? false : true}
          onClick={() => removeUnitFormHandler(index)}
        >
          <i className="fas fa-minus flex items-center justify-center text-xl h-5 w-5"></i>
        </FormButton>
      </div>
    )
  );
};

export default UnitTypeForm;
