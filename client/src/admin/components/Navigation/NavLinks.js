import { NavLink } from "react-router-dom";

import addProperty from "../../../static/icons/add-property.png";
import amenity from "../../../static/icons/amenity.png";
import unitType from "../../../static/icons/unit-type.png";
import { ReactComponent as Blog } from "../../../static/svgs/blog.svg";

const NavLinks = (props) => {
  const lis = [
    {
      title: "Property",
      linkTo: "addProperty",
      // icon: <i className="fas fa-home"></i>,
      icon: (
        <img src={addProperty} alt="Add Property" className="w-6 invert"></img>
      ),
    },
    {
      title: "User Property",
      linkTo: "addUserProperty",
      // icon: <i className="fas fa-home"></i>,
      icon: (
        <img src={addProperty} alt="Add Property" className="w-6 invert"></img>
      ),
    },
    {
      title: "View all Properties",
      linkTo: "viewAllProperties",
      icon: <i className="fas fa-home text-lg"></i>,
    },
    {
      title: "View User Properties",
      linkTo: "viewUsersProperties",
      icon: <i className="fas fa-home text-lg"></i>,
    },
    {
      title: "View All Users",
      linkTo: "viewAllUsers",
      icon: <i className="fa-solid fa-user text-lg"></i>,
    },
    {
      title: "Location",
      linkTo: "addLocation",
      icon: <i className="fas fa-map-marker-alt text-lg pl-1"></i>,
    },
    {
      title: "Amenity",
      linkTo: "addAmenities",
      icon: <img src={amenity} alt="Amenity" className="w-5 invert" />,
    },
    {
      title: "Unity Type",
      linkTo: "addUnitType",
      icon: <img src={unitType} alt="Unit Type" className="w-5 invert" />,
    },
    {
      title: "Developer",
      linkTo: "addDeveloper",
      icon: <i className="fa fa-user-plus text-lg"></i>,
    },
    {
      title: "Blog",
      linkTo: "addBlog",
      icon: <Blog fill="white" width="1.15rem" height="1.15rem" />,
    },
    {
      title: "Contacts",
      linkTo: "contacts",
      icon: <i className="fa-regular fa-address-book text-lg"></i>,
    },
    {
      title: "View Appraisals",
      linkTo: "viewAppraisals",
      icon: <i className="fa-solid fa-person-circle-check text-lg"></i>,
    },
  ];

  return (
    <ul
      className="flex flex-col gap-1 text-gray-300 my-4 font-semibold w-full h-full"
      onMouseEnter={!props.isButtonClicked ? props.openDrawer : undefined}
      onMouseLeave={!props.isButtonClicked ? props.closeDrawer : undefined}
    >
      {lis.map((content, index) => (
        <li key={index} className="">
          <NavLink
            to={content.linkTo}
            className={`flex items-center gap-5 w-[230px]                 
                  border-[3px] border-transparent  text-xs bg-transparent py-[10px] cursor-pointer font-gillsans px-2 text-white 
                  hover:border-l-[color:var(--red-color)] hover:text-[color:var(--primary-color)]  hover:bg-[#070707] hover:pl-[0.88rem]`}
          >
            {content.icon}
            <div className="cursor-pointer">{content.title}</div>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
