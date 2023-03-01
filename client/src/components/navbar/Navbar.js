import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../static/images/logo.png";
import { AccountContext } from "../../context/account";
import { ToggleModeContext } from "../../context/toggle-mode";


const Navbar = ({ setIsNavbarOpen }) => {
  const { account } = useContext(AccountContext);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const { mode, setMode } = useContext(ToggleModeContext);


  const menuItems = [
    { value: "Home", link: "/" },
    { value: "Properties", link: "/properties" },
    { value: "Blog", link: "/blogs" },
    { value: "Why Anaween", link: "/why_anaween" },
    { value: "Contact Us", link: "/contact_us" },
    { value: "My Account", link: "/account" },
  ];

  const toggleNavbarHandler = (index) => {
    if (!showNav) {
      setIsNavbarOpen(true)
    } else {
      setIsNavbarOpen(false)
    }

    setShowNav((prev) => (prev ? false : true));
  };

  const menuChangeHandler = (index) => {
    setActiveIndex(index);
  };

  const backdropClickHandler = () => {
    setShowNav(false);
    setIsNavbarOpen(false)
  };

  const toggleMode = () => {
    setIsDark((prev) => (prev ? false : true));
    if (mode === "dark") {
      setMode("light")
    } else {
      setMode("dark")
    }
  }

  return (
    <header
      className={`relative grid grid-cols-[2fr,0fr] md:grid-cols-[14fr,1fr] lg:grid-cols-[60fr,1fr] items-center z-[999] bg-white text-black dark:text-white dark:bg-[color:var(--black)] md:border-b-2 border-[color:var(--orange)] dark:border-[color:var(--yellow)] mb-2`}

    >
      <div className="relative flex justify-between  items-start md:items-center
       py-3 md:py-6 px-8 md:px-8 lg:px-20 xl:px-32 2xl:px-52
       ">
        {/* ---Logo--- */}
        <Link
          to={"/"}
          onClick={backdropClickHandler}
        >
          <div className="relative flex flex-col gap-[0.65rem] items-center  justify-center z-50">
            {/* <img src={Logo} alt="logo" className="w-24 lg:w-auto lg:h-auto" /> */}
            <div className="flex items-center gap-1 justify-center z-50">
              <h1 className="text-4xl text-black dark:text-white">Anaween</h1>
              <div className="h-[0.3rem] w-[0.3rem] translate-y-[0.4rem] bg-black dark:bg-[color:var(--yellow)] rounded-full"></div>
            </div>
            <div className={`absolute ${account === "Pro" ? "bottom-7" : "-bottom-2"} w-full`}>
              <div className="w-full h-[0.2rem] md:h-1 bg-[color:var(--orange)]"></div>
              <div className="absolute bottom-0 right-0 w-1 h-[0.83rem] md:h-3 bg-[color:var(--orange)]"></div>
            </div>
            {account === "Pro" && <span className="self-end font-lig text-lg"><i>Plus</i></span>}
          </div>
        </Link>
        {/* ---Logo--- */}

        <div
          className={`absolute md:static top-16 flex justify-center bord bg-white dark:bg-[rgba(33,33,33,0.7)] md:top-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0
         overflow-hidden z-[1000] ${showNav ? "h-[95.4vh] md:h-[35px]" : "h-0 md:h-[35px]"} w-full md:w-fit transition-all duration-500`}
          onClick={backdropClickHandler}
        >
          <ul
            className={`
            flex-col md:flex-row translate-y-6 md:translate-y-0
           transition-all duration-500 items-center md:items-start gap-4 md:gap-5 lg:gap-11 xl:gap-16 text-lg sm:text-base xl:text-xl flex py-2 z-[80] overflow-hidden`}
            onClick={backdropClickHandler}
          >
            {menuItems.map((item, index) => (
              <li
                className="inline"
                onClick={() => menuChangeHandler(index)}
                key={index}
              >
                <Link
                  to={item.link}
                  className={`${activeIndex === index && "!text-[color:var(--orange)]"
                    } hover:text-[color:var(--orange)] dark:hover:text-[color:var(--orange)] text-black dark:text-white`}
                >
                  {item.value}
                </Link>
              </li>
            ))}
            {/* Toggler */}
            <li
              className={`${activeIndex === 7 && "!text-[color:var(--orange)]"
                } hover:text-[color:var(--orange)] dark:hover:text-[color:var(--orange)] text-black dark:text-white md:hidden`}
              onClick={toggleMode}
            >
              Toggle Theme
            </li>
          </ul>
        </div>
        <i
          className="fas fa-bars self-center text-[color:var(--orange)] text-lg md:text-xl lg:text-2xl cursor-pointer translate-y-2 md:hidden "
          onClick={toggleNavbarHandler}
        ></i>
      </div>
      <div className="absolute left-[60%] sm:left-1/2 md:left-[92%] lg:left-[93%] xl:left-[94%] sm:-translate-x-1/2 md:translate-x-0 translate-y-1 xl:translate-y-2 hidden md:block cursor-pointer">
        <div className={`w-12 h-6 relative self-center flex items-center justify-between bg-gray-400 rounded-full px-[0.4rem]`} onClick={toggleMode}>
          <span className="font-semibold">{account === "Pro" ? "L" : "D"}</span>
          <div className={`${isDark ? 'translate-x-[1.6rem]' : "translate-x-0"} absolute left-[0.15rem] w-4 h-4 transition-all duration-300 bg-[color:var(--secondary-color)] dark:bg-[color:var(--primary-color)] rounded-full shadow `}></div>
          <span className="font-semibold">{account === "Pro" ? "D" : "L"}</span>
        </div>
      </div>
    </header >
  );
};
export default Navbar;
