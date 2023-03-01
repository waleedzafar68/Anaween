import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import LocationPointer from "../../static/icons/contactlocation.png";

import Clock from "../../static/icons/clock.png";
import Phone from "../../static/icons/phone.png";
import Card from "../../components/contact-us/Card";
import { useForm } from "../../hooks/form-hook";
import { addContact } from "../../redux/contacts/action"
import { getLocations } from "../../redux/locations/action";

const ContactUs = () => {
  const dispatch = useDispatch();
  const locationReducer = useSelector((state) => state.locationReducer);
  const locations = locationReducer.data?.results || []
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+20");
  // It will confirm that actual location is sent not "Enter Location";
  const [selectedLocation, setSelectedLocation] = useState({
    id: "default-message",
    Location: "defaultSelected",
  });
  const [message, setMessage] = useState("");
  const date = new Date();

  const [formState, inputHandler] = useForm({
    Name: "",
    PhoneNumber: "",
    PreferedLocation: "",
    Message: "",
    Date: date.getDate(),
    Time: date.getSeconds().toLocaleString(),
  });

  useEffect(() => {
    dispatch(getLocations());
  }, []);

  const nameChangeHandler = (e) => {
    setName(e.target.value);
    inputHandler(e.target.id, e.target.value);
  };
  const locationChangeHandler = (e) => {
    setSelectedLocation(e.target.value);
    inputHandler(e.target.id, e.target.value);
  };
  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
    inputHandler(e.target.id, e.target.value);
  };

  const phoneChangeHandler = (input) => {
    setPhone(input);
    inputHandler("PhoneNumber", input);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log("submitted");
    if (selectedLocation.id === "default-message") {
      toast.error("Please Select Location. ");
      return;
    }

    dispatch(addContact({
      Name: formState.Name,
      PhoneNumber: formState.PhoneNumber,
      PreferedLocation: formState.PreferedLocation,
      Message: formState.Message,
      Date: new Date(),
      Time: new Date(),
    }), {})
    setName("");
    setSelectedLocation({
      id: "default-message",
      Location: "defaultSelected",
    });
    setMessage("");
    setPhone("+20");
  };

  return (
    <div className="font-avant-grade-bold tracking-wide">
      <div id="background-containe" className={`relative flex items-center bg-no-repeat bg-cover bg-center h-32 md:h-52 bg-[linear-gradient(rgba(12,49,78,0)0%,rgb(12,49,78)99.79%),url('./static/images/background.jpg')]`}>
        <div className="m-auto max-w-[1366px] w-[85%]">
          <h2 className="mt-14 md:mt-24 text-2xl md:text-5xl leading-[56px] text-[color:var(--primary-color)] dark:text-[color:var(--primary-color)] font-bold">
            Contact Us
          </h2>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-[95%] sm:w-11/12 md:11/12 2xl:w-[85%] mx-auto mt-8 md:mt-12">
        <Card className="!block !w-full md:!w-4/5 lg:!w-full  !py-6 xl:!py-10 lg:px-6 xl:!px-12 !h-fit !m-auto">
          <div className="flex flex-col text-center sm:text-left gap-3">
            <h2 className="text-lg sm:text-xl text-[color:var(--secondary-color)] dark:text-[color:var(--primary-color)] font-bold">
              We are always eager to hear from you
            </h2>
            <h3 className="sm:text-lg text-[color:var(--dark-gray)] dark:text-[color:var(--gray)]">
              Need assistance ? Just write us a message
            </h3>
          </div>
          <form action="" className="w-full mt-8 xl:mt-12" onSubmit={onSubmitHandler}>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
              <div className="flex flex-col gap-8">
                <input
                  type="text"
                  value={name}
                  id="Name"
                  className="relative bg-transparent border-2 border-[color:var(--secondary-color)] dark:border-[color:var(--primary-color)] focus:border-[color:var(--primary-color)] text-base lg:text-lg rounded-md  block w-full p-2 before:content['Name'] before:absolute before:-top-2 before:left-2 before:block before:text-white before:border-red-800 before:border-4 outline-none"
                  placeholder="Name"
                  onChange={nameChangeHandler}
                  required
                />
                <PhoneInput
                  specialLabel={""}
                  id={"phone"}
                  value={phone}
                  onChange={phoneChangeHandler}
                  defaultMask="red"

                  containerClass="group !bg-tranparent !border- !rounded-md"
                  inputClass="peer !px-[3.3rem] !py-[1.4rem] !w-full !bg-transparent !text-black dark:!text-white !border-2 !border-[color:var(--secondary-color)] dark:!border-[color:var(--primary-color)] focus:!border-[color:var(--primary-color)]"
                  buttonClass="!bg-transparent !text-2xl !px-[0.2rem] !rounded-l-0 !border-0 !border-r-2 !border-[color:var(--secondary-color)] dark:!border-[color:var(--primary-color)] peer-focus:!border-[color:var(--primary-color)]"
                  dropdownClass="!bg-black dark:!bg-white !text-black !dark:text-white !text-lg"
                />
                <select
                  className="block w-full bg-transparent text-[#212121] dark:text-white border-2 border-[color:var(--secondary-color)] dark:border-[color:var(--primary-color)] focus:border-[color:var(--primary-color)] py-2.5 px-4 pr-6 rounded-md leading-tight focus:outline-none"
                  name="PreferedLocation"
                  id="PreferedLocation"
                  defaultValue={selectedLocation.value}
                  onChange={locationChangeHandler}
                >
                  <option
                    value="defaultSelected"
                    className="text-[gray] bg-white dark:bg-[#212121]"
                    id={"default-message"}
                  >
                    Enter Location
                  </option>
                  {locations &&
                    locations.map((location) => (
                      <option value={location.Location} key={location._id} className="bg-white dark:bg-[#212121]">
                        {location.Location}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <textarea
                  name="Message"
                  value={message}
                  id="Message"
                  className="bg-transparent text-[#212121] dark:text-white border-2 border-[color:var(--secondary-color)] dark:border-[color:var(--primary-color)] focus:border-[color:var(--primary-color)] h-full w-full p-2 outline-none rounded-lg"
                  placeholder="Message"
                  onChange={messageChangeHandler}
                  rows={5}
                ></textarea>
              </div>
            </div>
            <div className="text-right mt-6">
              <button
                type="submit"
                className="py-2 px-8 hover:text-[color:var(--primary-color)] border-2 border-[color:var(--secondary-color)] dark:border-[color:var(--primary-color)] rounded-lg font-bold"
              >
                Submit
              </button>
            </div>
          </form>
        </Card>
        <Card className="!block !bg-transparent !p-5 lg:-translate-y-28 !w-full md:!w-3/5 lg:!w-3/4 !m-auto">
          <div className="flex justify-center">
            {/* <ContactUsSvg transform="scale(1.2) mt-1" /> */}
          </div>
          <h1 className="relative text-[#212121] dark:text-white text-[1.4rem] font-bold -top-2 left-10">
            How to reach us
          </h1>
          <div className="flex flex-col gap-4 text-[color:var(--dark-gray)] dark:text-[color:var(--gray)]">
            <div className="flex items-center text-left gap-4">
              <img src={LocationPointer} alt="location" className="h-10" />
              <div>
                <h2 className="text-lg font-bold text-[color:var(--secondary-color)] dark:text-[color:var(--primary-color)]">Address</h2>
                <p className="text-base xl:text-md">
                  Building 63, S 90th Street, Mountain view square <br />
                  New Cairo, Egypt.
                </p>
              </div>
            </div>
            <div className="flex items-center text-left gap-6">
              <img src={Phone} alt="phone" className="w-7 h-7" />
              <div>
                <h2 className="text-lg font-bold text-[color:var(--secondary-color)] dark:text-[color:var(--primary-color)]">Contacts</h2>
                <p className="text-base xl:text-md">
                  +201286663558
                </p>
              </div>
            </div>
            <div className="flex items-center text-left gap-4">
              <img src={Clock} alt="phone" className="w-7 h-7" />
              <div>
                <h2 className="text-lg font-bold text-[color:var(--secondary-color)] dark:text-[color:var(--primary-color)]">
                  Working Hours
                </h2>
                <p className="text-base xl:text-md">
                  Sunday-Thursday
                  <br /> 10:00 AM - 5:00 PM
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default ContactUs;
