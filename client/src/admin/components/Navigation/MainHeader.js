import axios from "axios";
import { useNavigate } from "react-router-dom";
// import stateContext from '../../context/StateContext'
// import { ATLAS_URI } from '../../Constants'

import FormButton from "../../components/UI/FormButton";

const MainHeader = (props) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    sessionStorage.setItem("accessToken", "");
    navigate("/admin/login");
  };
  return (
    <header className="main-header flex items-center w-full h-10 z-20 bg-[#212020] card-shadow">
      <div className="flex gap-1 items-baseline text-[0.7rem] text-white px-4 font-sans-serif font-semibold w-full">
        <span className="title">{props.type}</span>
        <i className="fas fa-chevron-right text-[0.57rem]"></i>
        <span className="subtitle">{props.subtype}</span>
      </div>
      <FormButton type="text" onClick={logoutHandler}>
        Logout
      </FormButton>
    </header>
  );
};
export default MainHeader;
