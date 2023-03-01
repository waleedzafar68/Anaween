import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { fCurrency } from "../../utils/formatNumber";
import PrevBtn from "../swiperjs/PrevBtn";
import NextBtn from "../swiperjs/NextBtn";
import ReadMore from "./ReadMore";

const PropertyCard = ({ data }) => {

  return (
    <div className="grid lg:grid-cols-2 border-2 bg-white dark:bg-[#212121] border-[color:var(--orange)] dark:border-[color:var(--yellow)] shadow-[-7px_10px_2px_0px_rgba(0,0,0,0.4)] shadow-[rgba(219,92,28,0.4)] dark:shadow-[rgba(233,177,93,0.4)] rounded-md overflow-hidden">
      <div className="flex flex-col gap-2 sm:gap-4 text-black dark:text-white order-2 sm:pl-8 lg:pl-10 2xl:pl-12 pt-4 p-6 sm:p-10 lg:p-12 2xl:p-14">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold">
            {data.Name}
          </h2>
          <h3 className="text-lg md:text-xl lg:text-2xl 2xl:text-3xl text-[color:var(--yellow)] dark:text-[color:var(--yellow)]">
            {data._ProjectDeveloper?.Name}
          </h3>
        </div>
        <div className="flex gap-2">
          <i className="fas fa-map-marker-alt text-[color:var(--orange)] dark:text-[color:var(--yellow)] text-xl"></i>
          <span className="text-sm sm:text-base text-black dark:text-white">
            {data.City} {data.Country}
          </span>
        </div>
        <span className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-semibold text-[color:var(--yellow)] dark:text-[color:var(--yellow)]">
          {fCurrency(data.Price)}
        </span>
        <p className="">{data.Description.slice(0, 400)}</p>
        {/* <ReadMore length={180}>{data.Description}</ReadMore> */}
        <div className="relative flex !justify-center gap-4 sm:mt-3 md:mt-4 lg:mt-8 w-fit z-10">
          {/* Swiper Wrapper content is justified to center in index.css file */}
          <Swiper
            breakpoints={{
              1536: { slidesPerView: 3, spaceBetween: 20 },
              1280: { slidesPerView: 3, spaceBetween: 10 },
              1024: { slidesPerView: 2, spaceBetween: 20 },
              640: { slidesPerView: 3 },
              400: { slidesPerView: 2 },
            }}
            pagination={{
              clickable: true,
            }}
            slidesPerView={1}
            spaceBetween={20}
            navigation={false}
            modules={[Pagination, Navigation]}
            className="mySwiper !w-fit !justify-center"
          >
            <div className="absolute flex justify-between w-full top-1/2 -translate-y-1/2 z-20">
              <PrevBtn className="" />
              <NextBtn className="" />
            </div>
            {data.Images.map((image, index) => (
              <SwiperSlide className="!h-24 md:!h-28 lg:!h-40 !w-full min-[400px]:!w-1/2 sm:!w-[32%] lg:!w-[50%] xl:!w-[32%] 2xl:!w-[32%]" key={index}>
                {/* // <SwiperSlide > */}
                <img src={`${process.env.REACT_APP_ATLAS_URL}/file/${image}`}
                  className="h-full w-full"
                  alt="property"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* {data.Images.map((image, index) => {
            if (index < 2) {
              return (
                <img src={`${process.env.REACT_APP_ATLAS_URL}/file/${image}`}
                  alt="property"
                  className="h-24 md:h-28 lg:h-32 w-[27%] sm:w-[30%] lg:w-1/4"
                  key={index}
                />
              );
            } else {
              return (
                <div
                  className="flex flex-col items-center justify-center h-24 md:h-28 lg:h-32 w-[25%] sm:w-[27%] lg:w-1/5 text-black dark:text-white bg-[color:var(--yellow)] dark:bg-[color:var(--orange)] rounded-md"
                  key={index}
                >
                  <span>More</span>
                  <span>Photos</span>
                </div>
              );
            }
          })} */}
        </div>
      </div>
      <div className="w-full h-[20rem] lg:h-[43rem] xl:h-[40rem] order-1 lg:order-2">
        <img src={`${process.env.REACT_APP_ATLAS_URL}/file/${data.Images[0]}`} alt="blog" className="h-full w-full" />
      </div>
    </div >
  );
};

export default PropertyCard;
