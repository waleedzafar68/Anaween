import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom";

import PropertyCard from "../../components/properties/PropoertiesCard";
import { getProperties, searchProperty } from "../../redux/properties/action";
import { getAmenities } from "../../redux/amenities/action";
import { getUnitTypes } from "../../redux/unit-types/action";
import { useForm } from "../../hooks/form-hook";

const AllProperties = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [activePropertyTypeIndex, setActivePropertyTypeIndex] = useState(0);
    const propertyReducer = useSelector((state) => state.propertyReducer);
    const propertyData = propertyReducer.data?.results || [];
    const loading = propertyReducer.loading || true;
    const unitTypeReducer = useSelector((state) => state.unitTypeReducer);
    const unitTypes = unitTypeReducer.data?.results || [];
    const amenityReducer = useSelector((state) => state.amenityReducer);
    const amenities = amenityReducer.data?.results || [];
    const prices = [];
    const installmentYears = [];
    const deliveryDates = [];

    // Setting the values of installmentYears, Price, DelvDate.
    propertyData.forEach(element => {
        installmentYears.push(element.InstallmentYears);
        deliveryDates.push(element.Delivery);
        prices.push(element.Price);
    });

    const selectList = [
        { name: "Area, Compound, Developer", values: [] },
        { name: "Price", values: prices, type: "price" },
        { name: "Monthly Installments", values: installmentYears, type: "installmentYears" },
        { name: "Property type", values: unitTypes, type: "propertyType" },
        { name: "Delivery", values: deliveryDates, type: "deliveryDate" },
        { name: "Amenities", values: amenities, type: "amenities" }
    ];
    const propertyTypes = [{ item: "For Sale", value: "For Sale" }, { item: "For Rent", value: "For Rent" }, { item: "Resale", value: "Re-sale" }]

    const [formState, inputHandler, setFormData] = useForm({
        // search: "",
        // price: "",
        // installmentYears: "",
        // propertyType: "",
        // deliveryDate: "",
        // amenities: "",
    });

    const [searchValue, setSearchValue] = useState("");
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    let state = {};

    const handleAmenityCheck = (e) => {
        let updatedList = [...selectedAmenities];
        if (e.target.checked) {
            updatedList = [...selectedAmenities, e.target.value];
        } else {
            updatedList.splice(selectedAmenities.indexOf(e.target.value), 1);
        }
        setSelectedAmenities(updatedList);
        inputHandler("amenities", updatedList);
    };

    const searchChangeHandler = (e) => {
        setSearchValue(e.target.value);
    };

    const searchClickHandler = (e) => {
        dispatch(searchProperty(state));
        setFormData("");
        setSelectedAmenities([]);
        setActiveDropDownIndex(null);
    };


    const [activeDropDownIndex, setActiveDropDownIndex] = useState(null);

    const dropDownClickHandler = (index) => {
        setActiveDropDownIndex(prev => prev === index ? null : index);
    };

    useEffect(() => {
        state = {
            ...(searchValue !== "" && { name: searchValue }),
            ...(formState.price && { price: formState.price }),
            ...(formState.installmentYears && { installmentYears: formState.installmentYears }),
            ...(formState.propertyType && { unitType: formState.propertyType._id }),
            ...(formState.deliveryDate && { deliveryDate: formState.deliveryDate }),
            ...(formState.amenities && { amenities: formState.amenities }),
            ...(formState.property && { property: formState.property }),
        }
    }, [searchValue, formState])

    useEffect(() => {
        if (location.state) {
            dispatch(searchProperty(location.state));
        } else {
            dispatch(getProperties());
            dispatch(getAmenities());
            dispatch(getUnitTypes());
        }
    }, [])

    useEffect(() => {
        const keyDownHandler = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                searchClickHandler();
            }
        };
        document.addEventListener("keydown", keyDownHandler);
        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, [formState, searchValue]);

    return (
        <div className="relative flex flex-col gap-8 bg-transparent mt-4 md:mt-0 px-4 sm:px-8 md:px-6 lg:px-16 2xl:px-20 pb-8 sm:pb-12">
            <div className="flex gap-6 justify-between">
                <h3 className="text-lg sm:text-xl lg:text-3xl text-center dark:text-[color:var(--gray)] text-[color:var(--dark-gray)]">Can't Find What You're Looking For?</h3>
                <Link to={"/appraisal"} type="text" className="py-1 sm:py-2 px-3 sm:px-4 text-center hover:text-[color:var(--primary-color)] border-2 border-[color:var(--secondary-color)] dark:border-[color:var(--primary-color)] rounded-md">
                    Request An Appraisal
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-6 lg:gap-10">

                {/* First Card */}

                <div
                    className={`rounded-md font-gillsans mx-auto w-full
                   border-2 border-[color:var(--orange)] dark:border-[color:var(--yellow)] shadow-[-7px_10px_2px_0px_rgba(219,92,28,0.4)] dark:shadow-[-7px_10px_2px_0px_rgba(233,177,93,0.4)]`}
                >
                    <div className="grid grid-cols-3 gap-4 px-4 sm:px-8 pt-4">
                        {
                            propertyTypes.map((type, index) => (
                                <button type="text" className={`${activePropertyTypeIndex === index ? 'bg-[color:var(--secondary-color)] dark:bg-[color:var(--primary-color)] !text-white dark:!text-black' : 'bg-transparent'} text-sm sm:text-base text-black dark:text-white py-1 border-2 border-[color:var(--secondary-color)] dark:border-[color:var(--primary-color)] rounded-md font-semibold`}
                                    onClick={() => { inputHandler("property", type.value); setActivePropertyTypeIndex(index) }}
                                    key={index}
                                >
                                    {type.item}
                                </button>
                            ))
                        }
                        <div className="col-span-3 relative w-full">
                            <input type="text" id="search" className="bg-transparent py-1 sm:py-2 pl-10 pr-4 border-2 border-[color:var(--secondary-color)] dark:border-[color:var(--primary-color)] placeholder:text-[color:var(--gray)] dark:placeholder:text-white  w-full rounded-md outline-none" placeholder="Search"
                                value={searchValue}
                                onChange={searchChangeHandler}
                            />
                            <label htmlFor="search" className="absolute left-4 top-1/2 -translate-y-1/2">
                                <i className="fa-solid fa-magnifying-glass text-[color:var(--secondary-color)] dark:text-[color:var(--primary-color)] cursor-text"></i>
                            </label>
                        </div>
                    </div>
                    {/* Filters */}
                    <ul
                        className={`flex flex-col items-center justify-center self-center mx-auto w-full mt-5`}
                    // onClick={() => dropDownClickHandler(index1)}
                    >
                        {selectList.map((item, index1) => (
                            <li className="relative h-full w-full bg-[transparent] odd:bg-[rgba(219,92,28,0.2)] dark:odd:bg-[rgba(233,177,93,0.2)]" key={index1}>
                                <div
                                    className={`${activeDropDownIndex === index1 ? "z-30" : "z-10"
                                        }  text-black dark:text-white flex items-center justify-between py-3 px-4 xl:px-8 cursor-pointer w-full`}
                                    // tabIndex={1}
                                    onClick={() => dropDownClickHandler(index1)}
                                    key={index1}
                                >
                                    <span className="text-xs lg:text-sm font-semibold">{item.type === "amenities" ? "Amenities" : formState[item.type]?.Name ? formState[item.type].Name : formState[item.type] ? formState[item.type] : item.name}</span>
                                    <i className={` ${activeDropDownIndex === index1 ? "rotate-180" : "rotate-0"
                                        } fa-solid fa-chevron-down text-[color:var(--yellow)] text-lg font-semibold transition-all duration-500 `}></i>
                                </div>
                                {item.values.length > 0 &&
                                    <ul className={`${activeDropDownIndex === index1 ? "translate-y-0 visible opacity-100" : "-translate-y-6 invisible opacity-10"
                                        } absolute top-14 lg:top-[3.2rem] flex flex-col gap-2 py-3 px-3 xl:px-7 w-full transition-all duration-500 border-2 border-[color:var(--secondary-color)] dark:border-[color:var(--primary-color)] bg-white dark:bg-[#212121] cursor-pointer z-20`}
                                        tabIndex={1}
                                        onBlur={() => setActiveDropDownIndex(null)}
                                    >
                                        {index1 !== 5 ? item.values.map((value, index2) => (
                                            <li className="hover:!text-[color:var(--orange)] cursor-pointer" key={index2}
                                                onClick={() => { inputHandler(item.type, value); setActiveDropDownIndex(null) }}>
                                                {value.Name ? value.Name : value}
                                            </li>
                                        )) : item.values.map((value) => (
                                            <li key={value._id}>
                                                <input
                                                    type="checkbox"
                                                    name={`${item.type}`}
                                                    id={`${value._id}`}
                                                    value={value._id}
                                                    onChange={handleAmenityCheck}
                                                    checked={selectedAmenities.includes(value._id)}
                                                    className="w-[0.6rem] hidden"
                                                />
                                                <label
                                                    htmlFor={`${value._id}`}
                                                    className={`${selectedAmenities.includes(value._id) && "!text-[color:var(--secondary-color)] "} flex items-center justify-center gap-3 hover:!text-[color:var(--secondary-color)] cursor-pointer w-full`}
                                                >{selectedAmenities.includes(value._id) && <i className="fa-solid fa-check"></i>} {value.Name}</label>
                                            </li>
                                        ))
                                        }
                                    </ul>}
                            </li>
                        ))}
                    </ul>
                </div>
                {propertyData ? propertyData.map((data, index) => (
                    <PropertyCard data={data} key={index} />
                )) : loading && !propertyData ? [...Array(6)].map((val, index) => (<div
                    className={`animate-pulse pb-12 rounded-md font-gillsans mx-auto w-full h-[30rem]
                    md:w-11/12 border-2 dark:border-gray-400 shadow-[-7px_10px_2px_0px_rgba(0,0,0,0.4)] dark:shadow-black`}
                    key={index}
                >
                    <div className="w-full h-[195px] rounded-[0.29rem] bg-gray-400 overflow-hidden">

                    </div>
                    <div className="px-4 md:px-8 mt-8">
                        <h2 className="p-5 bg-gray-300 w-1/2 opacity-40 rounded-xl">

                        </h2>
                        <div className="flex justify-between items-center mt-3 mb-3">
                            <h3 className="p-6 bg-gray-300 w-3/5 opacity-40 rounded-xl">

                            </h3>
                            <i className="fas fa-heart text-2xl text-gray-300 mr-8"></i>
                        </div>

                        <div className="flex gap-1 sm:gap-2 mb-8">
                            <i className="fas fa-map-marker-alt text-gray-300 text-xl"></i>
                            <span className="p-3 bg-gray-300 w-1/4 opacity-40 rounded-xl ">

                            </span>
                        </div>
                        <div>
                            <div className="p-5 bg-gray-300 w-11/12 opacity-40 rounded-xl mx-auto"></div>
                        </div>
                    </div>
                </div>)) : <div className="my-6"><p className="text-3xl md:text-4xl lg:text-5xl font-semibold">Oops! Could not find any property.</p></div>}
            </div>
        </div >
    )
}

export default AllProperties;