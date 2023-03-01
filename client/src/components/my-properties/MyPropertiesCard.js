import { useNavigate } from "react-router-dom";

import Apartment from "../../static/images/apartment.jpg";
import { getUserProperty } from "../../redux/user-properties/action";


const MyPropertiesCard = ({ data, onClick = undefined }) => {
  const navigate = useNavigate();
  const name = data.Name.split(" ").join("_")
  const onClickHandler = () => {
    navigate(`/my_property/${data._id}/${name}`)
  }

  return (
    <div className="flex justify-between flex-col-reverse md:flex-row border-2 bg-white dark:bg-[#212121] border-[color:var(--yellow)] dark:border-[color:var(--yellow)] shadow-[-7px_10px_2px_0px_rgba(219, 92, 28,0.2)] dark:shadow-[-7px_10px_2px_0px_rgba(233, 177, 93,0.4)] rounded-md overflow-hidden"
      onClick={onClickHandler}
    >
      <div className="flex flex-col gap-4 text-black dark:text-white pl-8 lg:pl-10 2xl:pl-12 pt-6 p-10 lg:p-12 2xl:p-14">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold">
            {data.Name}
          </h2>
          <h3 className="text-lg md:text-xl lg:text-2xl 2xl:text-3xl text-[color:var(--yellow)] dark:text-[color:var(--yellow)]">
            {data.Project_Developer}
          </h3>
        </div>
        <div className="flex gap-2">
          <i className="fas fa-map-marker-alt text-[color:var(--orange)] dark:text-[color:var(--yellow)] text-xl"></i>
          <span className="text-sm sm:text-base text-black dark:text-white">
            {data.City} {data.Country}
          </span>
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          <span className="text-xl lg:text-2xl 2xl:text-3xl">
            Bought for<span className="hidden lg:inline">: </span>
            {"  "}
          </span>
          <span className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-semibold text-[color:var(--yellow)] dark:text-[color:var(--yellow)]">
            {data.BoughtFor}
          </span>
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          <span className="text-xl lg:text-2xl 2xl:text-3xl">
            Market Price<span className="hidden lg:inline">:</span>
          </span>
          <span className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-semibold text-[color:var(--yellow)] dark:text-[color:var(--yellow)]">
            {data.MarketPrice}
          </span>
        </div>
      </div>
      <div className="h-[16rem] md:h-auto lg:h-[23rem] w-full md:w-1/2">
        <img src={`${process.env.REACT_APP_ATLAS_URL}/file/${data?.Images[0]}`} alt="blog" className="h-full w-full" />
      </div>
    </div>
  );
};

export default MyPropertiesCard;
