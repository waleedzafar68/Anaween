import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { useForm } from "../../hooks/form-hook";

const ContactUsForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("+20");

  const [formState, inputHandler] = useForm({
    Name: "",
    Location: "",
    phone: "",
    message: "",
  });

  const nameChangeHandler = (e) => {
    setName(e.target.value);
    inputHandler(e.target.id, e.target.value);
  };
  const phoneChangeHandler = (input) => {
    setPhone(input);
    inputHandler("phone", input);
  };
  const locationChangeHandler = (e) => {
    setLocation(e.target.value);
    inputHandler(e.target.id, e.target.value);
  };
  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
    inputHandler(e.target.id, e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setName("");
    setPhone("");
    setLocation("");
    setMessage("");

    console.log(formState);
  };

  return (
    <form
      action=""
      className="mt-12 mx-auto font-avant-grade-md tracking-widest w-full"
      onSubmit={onSubmitHandler}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] 2xl:grid-cols-[1fr,2fr] gap-8 md:gap-4 w-full">
        <div className="flex flex-col gap-4">
          <div className="relative z-0 w-full group mb-4">
            <input
              type="text"
              value={name}
              onChange={nameChangeHandler}
              name="Name"
              id="Name"
              className="block py-[0.58rem] px-4 w-full bg-transparent border-2 text-black dark:text-white border-[color:var(--orange)] dark:border-[color:var(--yellow)] appearance-none focus:outline-none  rounded-lg z-0"
              placeholder="Name"
              required
            />
            <label
              htmlFor="Name"
              className="absolute tex top-0 z-10 origin-[0] left-3 text-sm -translate-y-2 text-black dark:text-white bg-white dark:bg-[#212121] px-1"
            >
              Name
            </label>
          </div>
          <div className="relative z-[15] text-black dark:text-white rounded-lg mb-4">
            <PhoneInput
              specialLabel={""}
              id={"phone"}
              value={phone}
              onChange={phoneChangeHandler}
              defaultMask="red"
              containerClass="group !bg-tranparent !border-[color:var(--secondary-color)] dark:!border-[color:var(--primary-color)] !border-2 !rounded-md"
              inputClass="!px-[3.3rem] !py-[1.4rem] !w-full !bg-transparent !text-black dark:!text-white !border-none"
              buttonClass="!bg-transparent !text-2xl !px-[0.2rem] !rounded-l-0 !border-t-0 !border-l-0 !border-b-0 !border-r-2 !border-r-[color:var(--secondary-color)] dark:!border-r-[color:var(--primary-color)]"
              dropdownClass="!bg-black dark:!bg-white !text-black !dark:text-white !text-lg"
            />
            <label
              htmlFor="phone"
              className="absolute top-0 z-10 origin-[0] left-3 text-sm -translate-y-2 text-black dark:text-white bg-white dark:bg-[#212121] px-1"
            >
              Phone Number
            </label>
          </div>
          <div className="relative z-0 w-full group">
            <input
              type="text"
              value={location}
              onChange={locationChangeHandler}
              name="Location"
              id="Location"
              className="block py-[0.58rem] px-4 w-full bg-transparent border-2 text-black dark:text-white border-[color:var(--orange)] dark:border-[color:var(--yellow)] appearance-none focus:outline-none  rounded-lg z-0"
              placeholder="Enter Location"
              required
            />
            <label
              htmlFor="Name"
              className="absolute top-0 z-10 origin-[0] left-3 text-sm -translate-y-2 text-black dark:text-white bg-white dark:bg-[#212121] px-1"
            >
              Preferred Location
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mt-4 lg:mt-0">
          <textarea
            name="message"
            id="message"
            value={message}
            rows={4}
            onChange={messageChangeHandler}
            className="block py-3 px-4 w-full bg-transparent border-2 text-black dark:text-white border-[color:var(--orange)] dark:border-[color:var(--yellow)] appearance-none focus:outline-none rounded-lg z-0 h-full"
            placeholder="Message"
          ></textarea>
          <label
            htmlFor="message"
            className="absolute top-0 z-10 origin-[0] left-3 text-sm -translate-y-2 text-black dark:text-white bg-white dark:bg-[#212121] px-1"
          >
            Message
          </label>
        </div>
      </div>
      <div className="text-right mt-6">
        <button
          type="submit"
          className="py-2 px-8 border-2 hover:text-[color:var(--orange)] text-black dark:text-white border-[color:var(--orange)] dark:border-[color:var(--yellow)] rounded-lg font-semibold font"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
export default ContactUsForm;
