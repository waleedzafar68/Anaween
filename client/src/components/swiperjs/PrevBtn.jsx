import { React } from "react";
import { useSwiper } from "swiper/react";

const PrevBtn = (props) => {
  const swiper = useSwiper();

  return (
    <button
      className={`${props.className} z-20`}
      onClick={() => swiper.slidePrev()}
    >
      <i className={`fa fa-chevron-left text-3xl text-[color:var(--primary-color)] cursor-pointer`} aria-hidden="true"></i>
    </button>
  );
};

export default PrevBtn;
