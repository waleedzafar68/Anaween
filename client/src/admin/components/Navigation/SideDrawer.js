import { useState } from "react";

import NavLinks from "./NavLinks";

const SideDrawer = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerIsOpen((prev) => !prev);
  };
  const openDrawer = () => {
    setDrawerIsOpen(true);
  };
  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };

  return (
    <aside
      className={`side-drawer flex flex-col relative flex-shrink-0 left-0 top-0 z-20 ${
        drawerIsOpen ? "w-[220px]" : "w-[44px]"
      } transition-all duration-[900ms] h-screen bg-[#212020] card-shadow overflow-hidden`}
      onClick={props.onClick}
    >
      <div
        className={`relative flex ${
          drawerIsOpen ? "justify-between" : "justify-center"
        } text-gray-300 font-semibold p-4`}
      >
        <h2 className="text-xs text-left">Navigation</h2>
        <button
          className="main-navigation__menu-btn absolute bg-[#212020] px-4 right-0 w-12 h-5 flex flex-col justify-around cursor-pointer"
          onClick={toggleDrawer}
        >
          <span
            className={`${
              drawerIsOpen ? "-rotate-45 top-[0.52rem]" : "rotate-0"
            } transition-all duration-500 relative block w-5 h-[3px] bg-white`}
          ></span>
          <span
            className={`${
              drawerIsOpen ? "opacity-0" : "opaccity-1"
            } transition-all duration-500 relative block w-5 h-[3px] bg-white`}
          ></span>
          <span
            className={`${
              drawerIsOpen ? "rotate-45 -top-[0.3rem]" : "rotate-0"
            } transition-all duration-500 relative block w-5 h-[3px] bg-white`}
          ></span>
        </button>
      </div>
      <NavLinks
        isOpen={drawerIsOpen}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
      />
    </aside>
  );
};
export default SideDrawer;
