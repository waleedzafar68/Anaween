import { useNavigate } from "react-router-dom";

import { fCurrency } from "../../utils/formatNumber";
import ContactComponent from "../contact-component/ContactComponent";

const PropertyCard = ({ data }) => {
  const navigate = useNavigate();
  const name = data.Name.split(" ").join("_")

  const onClickHandler = () => {
    navigate(`/property/${data._id}/${name}`)
  }

  return (
    <div
      className={`pb-12 rounded-md font-gillsans mx-auto w-full
      border-2 outline outline-[2px] outline-transparent hover:outline-[color:var(--primary-color)] border-[color:var(--orange)] dark:border-[color:var(--yellow)] shadow-[-7px_10px_2px_0px_rgba(219,92,28,0.4)] dark:shadow-[-7px_10px_2px_0px_rgba(233,177,93,0.4)]`}
      onClick={onClickHandler}
    >
      <div className="w-full h-fit sm:h-[195px] rounded-[0.29rem] bg-[#EFEFEF] overflow-hidden">
        <img src={`${process.env.REACT_APP_ATLAS_URL}/file/${data.Images[0]}`} alt="Property" />
      </div>
      <div className="px-2 md:px-4 lg:px-8 mt-8">
        <div className="px-2 lg:px-0">
          <h2 className="text-3xl font-semibold text-black dark:text-white">
            {data.Name}
          </h2>
          <div className="flex justify-between items-center mt-3 mb-3">
            <h3 className="text-xl sm:text-3xl font-semibold text-[color:var(--orange)] dark:text-[color:var(--yellow)]">
              {fCurrency(data.Price)}
            </h3>
            <i className="far fa-heart text-2xl text-[color:var(--orange)] dark:text-[color:var(--yellow)] mr-8"></i>
          </div>

          <div className="flex gap-1 sm:gap-2 mb-8">
            <i className="fas fa-map-marker-alt text-[color:var(--orange)] dark:text-[color:var(--yellow)] text-xl"></i>
            <span className="text-sm sm:text-base text-black dark:text-white">
              {data.City} {data.Country}
            </span>
          </div>
        </div>
        <ContactComponent />
      </div>
    </div>
  );
};
export default PropertyCard;
