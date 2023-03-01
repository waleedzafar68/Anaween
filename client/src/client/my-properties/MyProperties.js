import { useDispatch, useSelector } from "react-redux";

import MyPropertiesCard from "../../components/my-properties/MyPropertiesCard";
import Footer from "../../components/footer/Footer";
import { getUserPropertiesByUserId } from "../../redux/user-properties/action"
import { Fragment, useEffect } from "react";

const AllProperties = () => {
  const dispatch = useDispatch();
  const userPropertyReducer = useSelector((state) => state.userPropertyReducer);
  const properties = userPropertyReducer.data?.results || [];
  const loading = (userPropertyReducer.loading);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    dispatch(getUserPropertiesByUserId(userId));
  }, [])

  return (
    <Fragment>
      <div className="relative flex flex-col gap-8 px-4 sm:px-8 md:px-16 lg:px-24 pb-12 bg-white dark:bg-[#212121]">
        <div className="absolute left-10 lg:left-[4.6rem] -top-12 w-full h-fit z-20 hidden md:block">
          <div className="w-[0.4rem] h-32 lg:h-[9rem] bg-[color:var(--orange)]"></div>
          <div className="absolute top-32 lg:top-[9rem] left-0 w-[2rem] h-1 md:h-[0.4rem] bg-[color:var(--orange)]"></div>
          <div className="absolute top-32 lg:top-[8.9rem] left-11 w-2 h-2 rounded-full border-2 border-[color:var(--yellow)] bg-[color:var(--yellow)]"></div>
        </div>
        <div className="flex flex-col gap-1 md:gap-2 text-white text-2xl md:text-3xl lg:text-4xl ml-4 sm:ml-8 md:ml-0 mb-0 sm:mb-4 lg:mb-6 font-semibold">
          <h2 className="text-black dark:text-white">All</h2>
          <h2 className="text-[color:var(--yellow)] dark:text-[color:var(--orange)]">
            Properties
          </h2>
        </div>
        {properties.length !== 0 ? properties.map((data, index) => (
          <MyPropertiesCard data={data} key={index} />
        )) : loading && properties.length === 0 ? <div className="animate-pulse flex justify-between flex-col-reverse md:flex-row border-2 bg-gray-300 dark:bg-[#212121] border-[color:var(--yellow)] dark:border-[color:var(--yellow)] shadow-[-7px_10px_2px_0px_rgba(219, 92, 28,0.2)] dark:shadow-[-7px_10px_2px_0px_rgba(233, 177, 93,0.4)] rounded-md overflow-hidden"
        >
          <div className="flex flex-col gap-4 text-black dark:text-white pl-8 lg:pl-10 2xl:pl-12 pt-6 p-10 lg:p-12 2xl:p-14">
            <div className="flex flex-col gap-2">
              <h2 className="bg-gray-300 py-5 px-20 rounded-md w-fit">
                {/* {data.Name} */}
              </h2>
              <h3 className="bg-gray-300 py-4 px-24 rounded-md w-fit ">
                {/* {data.Project_Developer} */}
              </h3>
            </div>
            <div className="flex gap-2">
              <i className="fas fa-map-marker-alt text-gray-300 text-xl"></i>
              <span className="bg-gray-300 py-3 px-8 rounded-md " />
              <span className="bg-gray-300 py-3 px-8 rounded-md " />
              {/* {data.City} {data.Country} */}
            </div>
            <div className="flex flex-col lg:flex-row gap-2 lg:items-center">
              <span className="bg-gray-300 py-6 px-20 rounded-md text-xl lg:text-2xl 2xl:text-3xl">
                {"  "}
              </span>
              <span className="bg-gray-300 py-5 px-12 rounded-md h-fit">
                {/* {data.BoughtFor} */}
              </span>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 lg:items-center">
              <span className="bg-gray-300 py-6 px-20 rounded-md text-xl lg:text-2xl 2xl:text-3xl">
                {"  "}
              </span>
              <span className="bg-gray-300 py-5 px-12 rounded-md h-fit">
                {/* {data.BoughtFor} */}
              </span>
            </div>
          </div>
          <div className="bg-gray-300 h-[16rem] md:h-auto lg:h-[23rem] w-full md:w-1/2">
            {/* <img src={Apartment} alt="blog" className="h-full w-full" /> */}
            {/* <img src={`${process.env.REACT_APP_ATLAS_URL}/file/${data.Images[0]}`} alt="Property" /> */}
          </div>
        </div> : <div className="my-6"><p className="text-3xl md:text-4xl lg:text-5xl font-semibold">Oops! Could not find any property.</p></div>
        }
      </div>
      <Footer />
    </Fragment>
  );
};

export default AllProperties;