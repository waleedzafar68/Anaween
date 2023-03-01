import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { getLocations } from "../../redux/locations/action";
import { addContact } from "../../redux/contacts/action";
import DateList from "../../components/meeting/DateList";
import { useForm } from "../../hooks/form-hook";

const Meeting = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const timeRef = useRef(null);
  const locationReducer = useSelector(state => state.locationReducer);
  const locations = locationReducer.data?.results || []
  const locationsLoading = locationReducer.loading || 0
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+20");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const timings = [
    { time: "9:00 AM", value: "9:00 AM" },
    { time: "10:00 AM", value: "10:00 AM" },
    { time: "11:00 AM", value: "11:00 AM" },
    { time: "12:00 PM", value: "12:00 PM" },
    { time: "3:00 PM", value: "15:00 PM" },
    { time: "5:00 PM", value: "17:00 PM" },
  ];

  const noOfDays = 12;

  const [formState, inputHandler] = useForm({
    Name: "",
    PhoneNumber: "",
    PreferedLocation: "",
    Date: "",
    Time: "",
  });

  useEffect(() => {
    dispatch(getLocations());
  }, []);

  const dates = [];
  const date = new Date();
  for (let day = 0; day < noOfDays; day++) {
    dates.push({
      date: date.setDate(date.getDate() + 1),
    });
  }

  const nameChangeHandler = (e) => {
    setName(e.target.value);
    inputHandler(e.target.id, e.target.value);
  };

  const phoneChangeHandler = (input) => {
    setPhone(input);
    inputHandler("PhoneNumber", input);
  };

  const dateChangeHandler = (date) => {
    inputHandler("Date", date.date);
    setSelectedDate(date.date);
  };

  const locationChangeHandler = (e, location) => {
    setSelectedLocation(location);
    inputHandler(e.target.name, location.Location);
  };
  const timeChangeHandler = (e) => {
    setSelectedTime(e.target.value);
    inputHandler(e.target.name, e.target.value);
  };

  useEffect(() => {
    inputHandler("Message", "meeting scheduled");
  }, []);

  const handleTimeClick = () => {
    timeRef.current.click()
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!selectedLocation || !selectedDate || !selectedTime) {
      // alert("Please fill out the remaining fields!");
      toast.error("Please fill out the remaining fields!", { id: null });
      return;
    }

    const time = selectedTime.split(" ")[0];

    const hours = time.split(":")[0];
    const minutes = time.split(":")[1];
    const newTime = new Date(null, null, null, hours, minutes);
    dispatch(addContact({
      Name: formState.Name,
      PhoneNumber: formState.PhoneNumber,
      PreferedLocation: formState.PreferedLocation,
      Message: formState.Message,
      Date: new Date(formState.Date),
      Time: new Date(newTime),
      PropertyName: location.state ? location.state : ""
    }, {}))
    setName("");
    setSelectedLocation(null);
    setSelectedTime(null);
    setSelectedDate(null);
    setPhone("+20");
  };

  return (
    <Fragment>
      <div className="relative w-[95%] md:w-11/12 lg:w-10/12 px-6 sm:px-12 rounded-lg m-auto form-shadow h-fit tracking-wide border-2 border-[color:var(--orange)] dark:border-[color:var(--yellow)] shadow-[-7px_10px_2px_0px_rgba(0,0,0,0.4)] shadow-[color:var(--orange)] dark:shadow-[color:var(--yellow)] pb-6">
        <h2 className="text-center md:text-left font-bold sm:p-0 text-xl sm:text-2xl lg:text-3xl my-2 md:my-4 lg:my-10">
          Your Information
        </h2>
        <form
          action=""
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-4 2xl:gap-6"
        >
          <div className="flex flex-wrap lg:items-end gap-3 md:gap-6 lg:gap-8">
            <div className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/4">
              <label
                htmlFor="Name"
                className="block mb-2 text-sm sm:text-base font-medium"
              >
                Your Name
              </label>
              <input
                type="text"
                value={name}
                id="Name"
                className="text-base leading-none border border-[color:var(--gray)] bg-transparent te outline-0 rounded-md block w-full py-3 px-2.5 focus:border-[color:var(--secondary-color)]"
                placeholder="John"
                required
                onChange={nameChangeHandler}
              />
            </div>
            <div className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/4">
              <label
                htmlFor="PhoneNumber"
                className="block mb-2 text-sm sm:text-base font-medium"
              >
                Phone Number
              </label>
              <PhoneInput
                specialLabel={""}
                id={"PhoneNumber"}
                country={"th"}
                value={phone}
                onChange={phoneChangeHandler}
                containerClass="!bg-tranparent"
                inputClass="peer !px-[3.3rem] !py-[1.4rem] !w-full focus:!border-[color:var(--secondary-color)] !border-[color:var(--gray)] border !bg-transparent !text-black dark:!text-white"
                buttonClass="!bg-transparent !text-2xl !px-[0.2rem] !border-t-0 !border-l-0 !border-b-0 !border-r peer-focus:!border-r-[color:var(--secondary-color)]"
                dropdownClass="!bg-black dark:!bg-white !text-black !dark:text-white !text-lg"
              />
            </div>
          </div>
          <div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold">
              Select date
            </h3>

            {/* Date List */}
            <DateList
              dates={dates}
              dateChangeHandler={dateChangeHandler}
              selectedDate={selectedDate}
            />
          </div>
          {/* Location and time is below */}
          <div className="flex flex-col flex-wrap sm:flex-row-reverse gap-4 sm:gap-6 md:gap-10 justify-end sm:items-end mb-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold">
                Select location
              </h3>
              <div className="flex flex-wrap gap-4">
                {!locationsLoading ?
                  locations.map((location) => (
                    <div className="flex items-center gap-2" key={location._id}>
                      <input
                        type="radio"
                        id={location._id}
                        className="h-4 w-4"
                        name="PreferedLocation"
                        value={location.Location}
                        onChange={(e) => locationChangeHandler(e, location)}
                        checked={selectedLocation?._id === location._id}
                      />
                      <label
                        htmlFor={location._id}
                        className="text-xs sm:text-sm lg:text-base font-semibold"
                      >
                        {location.Location}
                      </label>
                    </div>
                  )) : <span>Loading locations...</span>}
              </div>
            </div>
            {/* Time */}
            <div className="flex flex-col gap-3">
              <h2 className="text-sm sm:text-base md:text-lg font-semibold">
                Select time
              </h2>
              <div className="relative">
                <select
                  className="block bg-transparent border border-[color:var(--gray)] cursor-pointer py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-[color:var(--secondary-color)] w-fit"
                  // className="block bg-transparent border border-[color:var(--gray)] cursor-pointer py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-[color:var(--secondary-color)] w-fit appearance-none"
                  name="Time"
                  id="Time"
                  defaultValue="9:00 AM"
                  onChange={timeChangeHandler}
                  ref={timeRef}
                >
                  {timings.map((time, index) => (
                    <option value={time.value} key={index} className=" bg-whtie dark:bg-[#212121]">
                      {time.time}
                    </option>
                  ))}
                </select>
                {/* <span className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer z-20" onClick={handleTimeClick}>
                  <i className="fa fa-chevron-down"
                  ></i>
                </span> */}
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 md:gap-8 md:justify-end mt-4 sm:mt-8 md:m-0">
            <button className="bg-transparent border-2 border-[color:var(--primary-color)]  hover:!text-[color:var(--secondary-color)] px-3 sm:px-7 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold" type="submit">
              Request this time
            </button>
            <a
              href="whatsapp://send?text=Lets chat!&phone=+923163366566"
              className="bg-transparent border-2 border-[color:var(--primary-color)] hover:!text-[color:var(--secondary-color)] px-3 sm:px-7 md:!px-10 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold"
            >
              Live chat now
            </a>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Meeting;
