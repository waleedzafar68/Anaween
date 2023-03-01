import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { ReactComponent as Map } from "../../static/svgs/home-map.svg";
import PropertyCard from "../../components/properties/PropoertiesCard";
import BlogCard from "../../components/blogs/BlogCard";
import { getProperties } from "../../redux/properties/action";
import { getAmenities } from "../../redux/amenities/action";
import { getBlogs } from "../../redux/blogs/action";
import { getLocations } from "../../redux/locations/action";
import { getUnitTypes } from "../../redux/unit-types/action";
import { useForm } from "../../hooks/form-hook";
import { ToggleModeContext } from "../../context/toggle-mode";
import { AccountContext } from "../../context/account";

const ClientHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const propertyReducer = useSelector((state) => state.propertyReducer);
  const amenityReducer = useSelector((state) => state.amenityReducer);
  const blogReducer = useSelector((state) => state.blogReducer);
  const locationReducer = useSelector((state) => state.locationReducer);
  const unitTypeReducer = useSelector((state) => state.unitTypeReducer);
  const unitTypes = unitTypeReducer.data?.results || []
  const locations = locationReducer.data?.results || []
  const propertyData = propertyReducer.data?.results || [];
  const amenities = amenityReducer.data?.results || [];
  const loading = propertyReducer.loading || 0;
  const blogsLoading = blogReducer.loading || 0;
  const blogData = blogReducer.data?.results || []
  const [activeDropDownIndex, setActiveDropDownIndex] = useState(null);
  const prices = [];
  const installmentYears = [];
  const deliveryDates = [];

  propertyData.forEach(element => {
    installmentYears.push(element.InstallmentYears);
    deliveryDates.push(element.Delivery);
    prices.push(element.Price);
  });

  const selectList = [
    { name: "Price", values: prices, type: "price" },
    { name: "Monthly Installments", values: installmentYears, type: "installmentYears" },
    { name: "Property type", values: unitTypes, type: "propertyType" },
    { name: "Delivery", values: deliveryDates, type: "deliveryDate" },
    { name: "Amenities", values: amenities, type: "amenities" }
  ];

  const [formState, inputHandler, setFormData] = useForm({
    search: "",
    location: "",
    price: 0,
    installmentYears: 0,
    propertyType: "",
    deliveryDate: 0,
    amenities: "",
  });

  const { setMode } = useContext(ToggleModeContext);
  const { setAccount } = useContext(AccountContext)
  const [searchValue, setSearchValue] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [activeLocationIndex, setActiveLocationIndex] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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
    navigate('/properties', { state })
    // dispatch(searchProperty(state));
    // setFormData("");
    // setSelectedAmenities([]);
    // setActiveDropDownIndex(null);
  };


  const locationClickHandler = (index, location) => {
    if (activeLocationIndex === index) {
      setActiveLocationIndex(null);
      inputHandler("location", null)
    } else {
      setActiveLocationIndex(index);
      inputHandler("location", location)
    }
  }


  const homeDropDownClickHandler = (index) => {
    setActiveDropDownIndex(prev => prev === index ? null : index);
  };

  // const dropDownClickHandler = (index) => {
  //   setActiveDropDownIndex(prev => prev === index ? null : index);
  // };

  useEffect(() => {
    state = {
      ...(searchValue !== "" && { name: searchValue }),
      ...(formState.location && formState.location._id ? { location: formState.location._id } : {}),
      ...(formState.price && { price: formState.price }),
      ...(formState.installmentYears && { installmentYears: formState.installmentYears }),
      ...(formState.propertyType && { unitType: formState.propertyType._id }),
      ...(formState.deliveryDate && { deliveryDate: formState.deliveryDate }),
      ...(formState.amenities && { amenities: formState.amenities }),
    }
  }, [searchValue, formState])

  useEffect(() => {
    dispatch(getProperties());
    dispatch(getAmenities());
    dispatch(getBlogs());
    dispatch(getLocations());
    dispatch(getUnitTypes());
  }, []);

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

  // To remove token from session storage;

  useEffect(() => {

    const isPro = sessionStorage.getItem('isPro');
    if (isPro) {
      setMode('light');
      setAccount('Pro');
    } else {
      setMode('dark');
      setAccount('client');
    }

    setTimeout(() => {
      sessionStorage.removeItem('accessToken');
    }, 60 * 60 * 1000);
  }, [])

  return (
    <div className="bg-white dark:bg-[#212121] text-center">
      <h2 className="text-lg sm:text-xl md:text-2xl xl:text-4xl text-[color:var(--primary-color)] dark:text-white font-bold pb-10 sm:pb-16 md:pb-24 pt-2 sm:pt-8 md:pt-16 px-4 sm:px-0">
        SELECT THE LOCATION OF YOUR FUTURE HOME
      </h2>
      <div className="flex items-center justify-center">
        <div className="relative w-11/12 sm:w-3/4 lg:w-3/5 xl:w-1/2">
          <Map
            width="100%"
            strokeWidth=".99px"
            className="fill-white dark:fill-black stroke-[color:var(--secondary-color)] dark:stroke-[color:var(--primary-color)]"
          // strokEiterLimit="10"
          />
          <div className="absolute right-[54.5%] sm:right-[56.5%] top-[7%] -translate-y-1/4 w-3 md:w-4 h-3 md:h-4 bg-[color:var(--primary-color)] hover:bg-[color:var(--secondary-color)] rounded-full group cursor-pointer"
            onClick={() => locationClickHandler(0, locations[0] ? locations[0] : "")}>
            <div className={`relative h-full transition-all duration-500 ${activeLocationIndex === 0 ? "visible opacity-100" : "opacity-0 invisible"} group-hover:opacity-100 group-hover:visible`}>
              <div className="absolute top-1/2 -translate-y-1/2 left-4 w-[12rem] md:w-[20rem] lg:w-[28rem] h-[0.14rem] bg-black dark:bg-white hidden md:block"></div>
              <div className="absolute bottom-1/2 ranslate-y-1/2 left-[12.88rem] md:left-[20.88rem] lg:left-[28.88rem] w-[0.14rem] h-[4rem] bg-black dark:bg-white hidden md:block"></div>
              <span className="absolute -bottom-12 md:bottom-[5rem] -left-4 md:left-[19rem] lg:left-[27rem] text-base md:text-xl text-[color:var(--secondary-color)] font-medium w-fit">
                {locations[0] ? locations[0].Location : ""}
              </span>
            </div>
          </div>
          <div className="absolute right-[55.2%] top-[21.3%] -translate-y-1/4 w-3 md:w-4 h-3 md:h-4 bg-[color:var(--primary-color)] hover:bg-[color:var(--secondary-color)] rounded-full group cursor-pointer"
            onClick={() => locationClickHandler(1, locations[1] ? locations[1] : "")}>
            <div className={`relative h-full transition-all duration-500 ${activeLocationIndex === 1 ? "visible opacity-100" : "opacity-0 invisible"} group-hover:opacity-100 group-hover:visible`}>
              <div className="absolute top-1/2 -translate-y-1/2 left-4 w-[20rem] lg:w-[28rem] h-[0.16rem] bg-black dark:bg-white hidden md:block"></div>
              <div className="absolute bottom-1/2 ranslate-y-1/2 left-[20.85rem] lg:left-[28.85rem] w-[0.16rem] h-[4rem] bg-black dark:bg-white hidden md:block"></div>
              <span className="absolute -bottom-12 md:bottom-[5rem] -left-4 md:left-[19rem] lg:left-[27rem] text-base md:text-xl text-[color:var(--secondary-color)] font-medium w-fit">
                {locations[1] ? locations[1].Location : ""}
              </span>
            </div>
          </div>
          <div className="absolute right-[40.5%] sm:right-[41.8%] top-[18%] -translate-y-1/4 w-3 md:w-4 h-3 md:h-4 bg-[color:var(--primary-color)] hover:bg-[color:var(--secondary-color)] rounded-full group cursor-pointer"
            onClick={() => locationClickHandler(2, locations[2] ? locations[2] : "")}>
            <div className={`relative h-full transition-all duration-500 ${activeLocationIndex === 2 ? "visible opacity-100" : "opacity-0 invisible"} group-hover:opacity-100 group-hover:visible`}>
              <div className="absolute top-1/2 -translate-y-1/2 left-4 w-[16rem] lg:w-96 h-[0.14rem] bg-black dark:bg-white hidden md:block"></div>
              <div className="absolute bottom-1/2 ranslate-y-1/2 left-[16.88rem] lg:left-[24.88rem] w-[0.14rem] h-[4rem] bg-black dark:bg-white hidden md:block"></div>
              <span className="absolute -bottom-12 md:bottom-[5rem] -left-4 md:left-[15rem] lg:left-[23rem] text-base md:text-xl text-[color:var(--secondary-color)] font-medium w-fit">
                {locations[2] ? locations[2].Location : ""}
              </span>
            </div>
          </div>
          <div className="absolute right-[34.5%] sm:right-[36.5%] top-[19.5%] -translate-y-1/4 w-3 md:w-4 h-3 md:h-4 bg-[color:var(--primary-color)] hover:bg-[color:var(--secondary-color)] rounded-full group cursor-pointer"
            onClick={() => locationClickHandler(3, locations[3] ? locations[3] : "")}>
            <div className={`relative h-full transition-all duration-500 ${activeLocationIndex === 3 ? "visible opacity-100" : "opacity-0 invisible"} group-hover:opacity-100 group-hover:visible`}>
              <div className="absolute top-1/2 -translate-y-1/2 left-4 w-[12rem] lg:w-80 h-[0.14rem] bg-black dark:bg-white hidden md:block"></div>
              <div className="absolute bottom-1/2 ranslate-y-1/2 left-[12.85rem] lg:left-[20.85rem] w-[0.14rem] h-[4rem] bg-black dark:bg-white hidden md:block"></div>
              <span className="absolute -bottom-12 md:bottom-[5rem] -left-4 md:left-[10.5rem] lg:left-[18.5rem] md:text-xl text-[color:var(--secondary-color)] font-medium w-fit">
                {locations[3] ? locations[3].Location : "Not Added Yet"}
              </span>
            </div>
          </div>
          <div className="absolute right-[20.5%] top-[43.8%] -translate-y-1/4 w-3 md:w-4 h-3 md:h-4 bg-[color:var(--primary-color)] hover:bg-[color:var(--secondary-color)] rounded-full group cursor-pointer"
            onClick={() => locationClickHandler(4, locations[4] ? locations[4] : "")}>
            <div className={`relative h-full transition-all duration-500 ${activeLocationIndex === 4 ? "visible opacity-100" : "opacity-0 invisible"} group-hover:opacity-100 group-hover:visible`}>
              <div className="absolute top-1/2 -translate-y-1/2 left-4 w-[6rem] lg:w-48 h-[0.14rem] bg-black dark:bg-white hidden md:block"></div>
              <div className="absolute bottom-1/2 ranslate-y-1/2 left-[6.85rem] lg:left-[12.85rem] w-[0.14rem] h-[4rem] bg-black dark:bg-white hidden md:block"></div>
              <span className="absolute -bottom-12 md:bottom-[5rem] -left-4 md:left-[5rem] lg:left-[11rem] text-base md:text-xl text-[color:var(--secondary-color)] font-medium w-fit">
                {locations[4] ? locations[4].Location : "Not Added Yet"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-[color:var(--primary-color)] dark:text-gray-400 text-xl font-medium mt-8 mb-16">
        Find exactly what you need in your future home
      </h3>

      {/* Filters */}
      <div
        className={`hidden md:grid items-center grid-cols-[1.5fr,1fr,1.2fr,1.2fr,1fr,1fr] gap-2 lg:gap-4 2xl:gap-8 w-full md:w-11/12 xl:w-10/12 justify-center self-center mx-auto`}
      >
        <div
          className={`grid grid-cols-[1fr,8fr] border-2 border-[color:var(--secondary-color)] dark:border-[color:var(--primary-color)] text-black dark:text-white placeholder:text-black placeholder:dark:text-white rounded-md overflow-hidden items-center pl-2 lg:pl-4 h-full`}
        >
          <i className="fa-solid fa-magnifying-glass text-[color:var(--primary-color)]"></i>
          <input
            type="text"
            value={searchValue}
            name="search"
            id="search"
            className="bg-transparent w-full px-1 md:px-2 outline-none h-full text-sm"
            onChange={searchChangeHandler}
            placeholder="Area, Compound, Developer"
          />
        </div>
        {selectList.map((item, index1) => (
          <div className="relative h-full" key={index1} tabIndex={1}
          // onBlur={() => setActiveDropDownIndex(null)}
          >
            <div
              className={`${activeDropDownIndex === index1 ? "" : ""
                } border-2 border-[color:var(--secondary-color)] dark:border-[color:var(--primary-color)] hover:!text-[color:var(--secondary-color)] text-black dark:text-white flex items-center justify-between rounded-md py-2 px-2 2xl:px-4 cursor-pointer h-full`}
              tabIndex={1}
              onClick={() => homeDropDownClickHandler(index1)}
            >
              <span className="text-xs lg:text-xxs">{item.type === "amenities" ? "Amenities" : formState[item.type]?.Name ? formState[item.type].Name : formState[item.type] ? formState[item.type] : item.name}</span>
              <i className="fa-solid fa-chevron-down text-[color:var(--primary-color)]"></i>
            </div>
            <ul className={`${activeDropDownIndex === index1 && item.values.length > 0 ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"} absolute top-14 lg:top-11 flex flex-col gap-2 p-2 w-full border-2 border-[color:var(--secondary-color)] dark:border-[color:var(--primary-color)] transition-all duration-300 cursor-default rounded-md z-20`}
              tabIndex={1}
              onBlur={() => setActiveDropDownIndex(null)}
            >
              {
                index1 !== 4 ? item.values.map((value, index2) => (
                  <li className={`hover:text-[color:var(--secondary-color)] cursor-pointer`} key={index2}
                    onClick={() => { inputHandler(item.type, value); setActiveDropDownIndex(null) }}>
                    {value.Name ? value.Name : value}
                  </li>))
                  : item.values.map((value) => (
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
            </ul>
          </div>
        ))}
      </div>

      {/* Drop down on Small Devices */}
      <div className="grid grid-cols-[4fr,3.5fr,1fr] items-center md:hidden px-4 sm:px-7">
        <div
          className={`grid grid-cols-[1fr,8fr] border-2 border-[color:var(--secondary-color)] dark:border-[color:var(--primary-color)] text-black dark:text-white placeholder:text-black placeholder:dark:text-white rounded-md overflow-hidden items-center pl-2 lg:pl-4 h-fit`}
        >
          <i className="fa-solid fa-magnifying-glass text-[color:var(--primary-color)]"></i>
          <input
            type="text"
            value={searchValue}
            name="search"
            id="search"
            className="bg-transparent w-full py-2 px-1 md:px-2 outline-none text-sm"
            onChange={searchChangeHandler}
            placeholder="Area, Compound, Developer"
          />
        </div>
        <div className="relative px-4 sm:px-6">
          <div className="flex gap-4 justify-between px-4 items-center w-full py-1.5 sm:py-1 border-2 border-[color:var(--secondary-color)] dark:border-[color:var(--primary-color)] rounded-md"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <span className="sm:text-lg">Filter</span>
            <i className={`${isFilterOpen ? "rotate-180" : "rotate-0"} fa fa-chevron-down text-[color(--secondary-color)] dark:text-[color:var(--primary-color)] transition-all duration-500`}></i>
          </div>
          <div className="px-4 sm:px-6">
            <ul
              className={`${isFilterOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-8 opacity-30'} absolute top-8 left-0 flex flex-col items-center justify-center self-center mx-auto w-full mt-5 duration-[450ms] transition-all bg-white dark:bg-[#212121] rounded-md z-20`}
            >
              {selectList.map((item, index1) => (
                <li className="relative h-full w-full bg-[transparent] odd:bg-[rgba(219,92,28,0.2)] dark:odd:bg-[rgba(233,177,93,0.2)]" key={index1}>
                  <div
                    className={`${activeDropDownIndex === index1 ? "z-30" : "z-10"
                      }  text-black dark:text-white flex items-center justify-between py-3 px-4 xl:px-8 cursor-pointer w-full`}

                    onClick={() => homeDropDownClickHandler(index1)}
                    key={index1}
                  >
                    <span className="text-left text-xs lg:text-sm font-semibold">{item.type === "amenities" ? "Amenities" : formState[item.type]?.Name ? formState[item.type].Name : formState[item.type] ? formState[item.type] : item.name}</span>
                    <i className={` ${activeDropDownIndex === index1 ? "rotate-180" : "rotate-0"
                      } fa-solid fa-chevron-down text-[color:var(--primary-color)] text-lg font-semibold transition-all duration-500 `}></i>
                  </div>
                  {item.values.length > 0 &&
                    <ul className={`${activeDropDownIndex === index1 ? "translate-y-0 visible opacity-100" : "-translate-y-6 invisible opacity-10"
                      } absolute top-14 lg:top-[3.2rem] flex flex-col gap-2 py-3 px-3 xl:px-7 w-full transition-all duration-500 border-2 border-[color:var(--secondary-color)] dark:border-[color:var(--primary-color)] bg-white dark:bg-[#212121] cursor-pointer z-20`}
                      tabIndex={1}
                      onBlur={() => setActiveDropDownIndex(null)}
                    >
                      {index1 !== 5 ? item.values.map((value, index2) => (
                        <li className="hover:!text-[color:var(--secondary-color)] cursor-pointer" key={index2}
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
        </div>
        <i className="fa fa-search text-lg text-[color(--secondary-color)] dark:text-[color:var(--primary-color)]"
          onClick={searchClickHandler}
        ></i>
      </div>
      {/* ---- */}

      <div className="relative text-left mt-14">
        {/* <div className="absolute left-10 lg:left-14 top-0 h-full z-20 hidden md:block w-full overflow-hidden">
          <div className="w-[0.4rem] h-[10rem] lg:h-[11rem] bg-[color:var(--secondary-color)]"></div>
          <div className="absolute top-[10rem] lg:top-[11rem] left-0 w-[2rem] h-1 md:h-[0.4rem] bg-[color:var(--secondary-color)]"></div>
          <div className="absolute top-[10rem] lg:top-[10.9rem] left-11 w-2 h-2 rounded-full border-2 border-[color:var(--primary-color)] bg-[color:var(--primary-color)]"></div>
        </div> */}
        <div className="bg-white dark:bg-[#212121] px-3 sm:px-9 md:px-8 xl:px-12 2xl:px-20 pb-16 pt-6">
          <div className="flex flex-col gap-1 md:gap-2 text-black dark:text-white text-2xl sm:text-3xl lg:text-4xl mb-8 md:mb-16 pl-4 sm:pl-9 lg:pl-12">
            <h2 className="font-bold text-[color:var(--primary-color)] dark:text-[color:var(--secondary-color)]">
              HOTTEST{" "}
            </h2>
            <h2 className="font-light">Properties</h2>
          </div>

          {/* Property Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 md:gap-x-8 lg:gap-10 px-1 max-[400px]:px-4 sm:px-12 md:px-4 lg:px-0">
            {!loading && propertyData ? propertyData.map((data, index) => (
              <PropertyCard data={data} key={index} />
            )) : [...Array(8)].map((val, index) => (<div
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
            </div>))
            }
          </div>
          <div className="flex flex-col items-center gap-12 my-28">
            <h2 className="text-lg sm:text-2xl md:text-3xl text-black dark:text-white">
              Can't Find What You're Looking For?
            </h2>
            <div className="flex flex-col items-center gap-4 py-6 border-2 border-[color:var(--secondary-color)] dark:border-[color:var(--primary-color)] w-11/12 md:w-4/6 lg:w-1/2 rounded-md">
              <span className="text-black dark:text-white text-base sm:text-xl px-4 sm:px-0 text-center sm:text-left">
                Want Anaween to cover the area you live in?
              </span>
              <Link
                to="/meeting"
                className="text-base sm:text-xl hover:!text-[color:var(--primary-color)] dark:hover:!text-[color:var(--secondary-color)] text-[color:var(--secondary-color)] dark:text-[color:var(--primary-color)]"
              >
                Fill out this form now
              </Link>
            </div>
          </div>

          {/* Blogs */}
          <div className="px-6 sm:px-9 md:px-14 lg:px-0">
            <h2 className="text-4xl font-bold text-[color:var(--secondary-color)] dark:text-[color:var(--primary-color)] my-12">
              BLOGS
            </h2>
            {!blogsLoading ? <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 2xl:gap-24 !font-light">
              {blogData.map((data, index) => (
                <BlogCard data={data} key={index} imageClass="h-[13rem] md:h-[18rem] lg:h-[14rem] xl:!h-[12rem] 2xl:!h-[12rem]" textLength={0} onClick={() => navigate('/blog', { state: data })} />
              ))}
            </div> : <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-24">
              {[...Array(4)].map((val, index) => (
                <div className="animate-pulse grid grid-col-1 lg:grid-cols-2 gap-8 rounded-md border-2 overflow-hidden dark:border-gray-400 shadow-[-7px_10px_2px_0px_rgba(0,0,0,0.4)] dark:shadow-black">
                  <div className="flex flex-col gap-8 pl-5 pr-4 py-5 order-2 lg:order-1">
                    <p className="bg-gray-300 h-[4rem] rounded-md text-lg">
                    </p>
                    <button className="border-2 w-fit self-end rounded-full bg-gray-300 py-4 px-12">

                    </button>
                  </div>
                  <div className="h-[13rem] md:h-[18rem] lg:h-[14rem] xl:!h-[12rem] 2xl:!h-[12rem] w-full order-1 bg-gray-200 rounded-md">

                  </div>
                </div>))}
            </div>}
          </div>
        </div>
      </div>
    </div >
  );
};

export default ClientHome;
