import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import ContactComponent from "../../components/contact-component/ContactComponent";
import PropertyCard from "../../components/property/PropertyCard";
import Footer from "../../components/footer/Footer";
import ContactUsForm from "../../components/property/ContactUsForm";
import Accordion from "../../components/property/Accordian";
import { getProperty } from "../../redux/properties/action";
import PrevBtn from "../../components/swiperjs/PrevBtn";
import NextBtn from "../../components/swiperjs/NextBtn";

const Property = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const propertyReducer = useSelector((state) => state.propertyReducer);
    let data = propertyReducer.data?.results[0] || null;
    const loading = propertyReducer.loading || 0

    useEffect(() => {
        dispatch(getProperty(params.id));
        window.scrollTo(0, 0)
    }, []);

    return (
        <Fragment>
            {data ?
                <div className="px-6 sm:px-8 md:px-16 2xl:px-20 pb-24">
                    <div className="my-8 float-right pr-4 sm:pr-9 md:pr-16">
                        <ContactComponent propertyName={data.Name} />
                    </div>
                    <div className="clear-both">
                        <PropertyCard data={data} />
                    </div>
                    <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 2xl:gap-20 mt-16">
                        <div className="flex flex-col gap-12">
                            {/* Payment Card */}
                            <div className="flex flex-col gap-1 sm:gap-8 justify-center items-center py-3 border-2 bg-white dark:bg-[#212121] border-[color:var(--yellow)] dark:border-[color:var(--yellow)]  shadow-[-7px_10px_2px_0px_rgba(0,0,0,0.4)] shadow-[rgba(219,92,28,0.4)] dark:shadow-[rgba(233,177,93,0.4)] rounded-md overflow-hidden">
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[color:var(--orange)] dark:text-[color:var(--yellow)]">
                                    Payment Plan
                                </h2>
                                <div className="flex flex-col sm:flex-row">
                                    <div className="flex flex-col justify-center items-center gap-2 px-4 sm:px-8 py-3 sm:py-0 border-b sm:border-b-0 sm:border-r">
                                        <div className="flex flex-col text-center text-lg sm:text-xl">
                                            <span>Down</span>
                                            <span>Payment</span>
                                        </div>
                                        <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[color:var(--yellow)] dark:text-[color:var(--orange)]">
                                            {data.DownPayment}%
                                        </span>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-2 px-4 sm:px-8 py-3 sm:py-0 border-x-0 border-y sm:border-y-0 sm:border-x">
                                        <div className="flex flex-col text-center text-lg sm:text-xl">
                                            <span>Installment Years</span>
                                            <span>Payment</span>
                                        </div>
                                        <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[color:var(--yellow)] dark:text-[color:var(--orange)]">
                                            {data.InstallmentYears}
                                        </span>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-2 px-4 sm:px-8 py-3 sm:py-0 border-t sm:border-t-0 sm:border-l">
                                        <div className="flex flex-col text-center text-lg sm:text-xl">
                                            <span>Delivery</span>
                                            <span>Date</span>
                                        </div>
                                        <span className="text-xl sm:text-2xl md:text-3xl text-center lg:text-4xl font-bold text-[color:var(--yellow)] dark:text-[color:var(--orange)]">
                                            {data.Delivery}
                                        </span>
                                    </div>
                                </div>
                                <button className="border-2 w-fit py-1 text-xl md:text-2xl hover:text-[color:var(--primary-color)] rounded-full px-4 md:px-6 border-[color:var(--yellow)] dark:border-[color:var(--yellow)] mb-2">
                                    MASTER PLAN
                                </button>
                            </div>
                            {/* Map */}
                            <div className="rounded-[1.2rem] overflow-hidden">
                                <div className="relative w-full h-[450px]">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: data.Link }}
                                        className="!w-full overflow-hidden myMap absolute"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Right content */}
                        <div>
                            {/* Amenities */}
                            <div>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[color:var(--orange)] dark:text-[color:var(--yellow)]">
                                    Amenities
                                </h2>
                                <ul className="grid grid-cols-2 gap-12 my-12">
                                    {data._Amenities.map((amenity, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <span className="h-1 w-1 rounded-full bg-[#212121] dark:bg-white"></span>
                                            <span className="sm:text-xl font-light">
                                                {amenity.Name}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Unit Types (Accordian) */}
                            <div>
                                <Accordion data={data} />
                            </div>
                            {/* Contact Us Form */}
                            <div className="">
                                <h2 className="text-xl font-medium text-[color:var(--orange)]">
                                    We are ready to assist you.
                                </h2>
                                <h3 className="text-[color:var(--dark-gray)] dark:text-[color:var(--gray)] text-lg">
                                    Leave us a message.
                                </h3>
                                <ContactUsForm />
                            </div>
                        </div>
                    </div>
                </div> : loading && !data ?
                    // Skeleton
                    <div className="animate-pulse flex flex-col gap-10 xl:gap-16 2xl:gap-20 px-6 sm:px-8 md:px-16 2xl:px-20 pb-24 mt-16">
                        <div className="clear-both">
                            {/* Property Card */}
                            <div className="grid lg:grid-cols-2 border-2 bg-white dark:bg-[#212121] border-black dark:border-white shadow-[-7px_10px_2px_0px_rgba(0,0,0,0.4)] shadow-[rgba(0,0,0,0.4)] dark:shadow-[rgba(255,255,255,0.4)] rounded-md overflow-hidden">
                                <div className="flex flex-col gap-4 text-black dark:text-white order-2 pl-8 lg:pl-10 2xl:pl-12 pt-4 p-10 lg:p-12 2xl:p-14">
                                    <div className="flex flex-col gap-2">
                                        <h2 className="py-5 px-24 sm:px-32 bg-gray-300 rounded-md w-fit">
                                            {/* {data.Name} */}
                                        </h2>
                                        <h3 className="py-4 px-20 sm:px-28 bg-gray-300 rounded-md w-fit">
                                            {/* {projectDeveloperData.filter(developer => developer._id === data.Project_Developer)[0]?.Name} */}
                                        </h3>
                                    </div>
                                    <div className="flex gap-2">
                                        <i className="fas fa-map-marker-alt text-gray-300 text-xl"></i>
                                        <div className="flex gap-1">
                                            <span className="bg-gray-300 py-2 px-10 rounded-md" />
                                            <span className="bg-gray-300 py-2 px-10 rounded-md" />
                                        </div>
                                    </div>
                                    <span className="bg-gray-300 py-5 px-24 rounded-md w-fit" />
                                    <div className="flex flex-col gap-4">
                                        <p className="bg-gray-300 py-3 rounded-md w-10/12"></p>
                                        <p className="bg-gray-300 py-3 rounded-md w-10/12"></p>
                                        <p className="bg-gray-300 py-3 rounded-md w-10/12"></p>
                                        <p className="bg-gray-300 py-3 rounded-md w-10/12"></p>
                                    </div>
                                    <div className="relative flex !justify-center gap-4 mt-3 md:mt-4 lg:mt-8 w-fit z-10">
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
                                            {[...Array(3)].map((image, index) => (
                                                <SwiperSlide className="!h-24 md:!h-28 lg:!h-40 !w-full min-[400px]:!w-1/2 sm:!w-[32%] lg:!w-[50%] xl:!w-[32%] 2xl:!w-[32%] border" key={index}>
                                                    <div className="bg-gray-300 w-full h-full px-6 sm:px-16 md:px-20 lg:px-12 xl:px-20 2xl:px-24" />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>
                                {/* Card Bigger Image */}
                                <div className="w-full h-[21.5rem] lg:h-[44.5rem] xl:h-[41.5rem] order-1 lg:order-2">
                                    <div className="bg-gray-300 w-full h-full" />
                                </div>
                            </div >
                        </div>
                        {/* Master Payment Card */}
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="flex flex-col gap-1 sm:gap-8 justify-center items-center py-3 border-2 bg-white dark:bg-[#212121] border-black dark:border-white shadow-[-7px_10px_2px_0px_rgba(0,0,0,0.4)] shadow-[rgba(0,0,0,0.4)] dark:shadow-[rgba(255,255,255,0.4)] rounded-md overflow-hidden">
                                <h2 className="py-7 px-24 bg-gray-300 rounded-md">
                                </h2>
                                <div className="flex flex-col sm:flex-row">
                                    <div className="flex flex-col justify-center items-center gap-2 px-4 sm:px-8 py-3 sm:py-0 border-b sm:border-b-0 sm:border-r">
                                        <div className="flex flex-col gap-2 text-center text-lg sm:text-xl">
                                            <span className="py-3 bg-gray-300 px-8 rounded-md"></span>
                                            <span className="py-3 bg-gray-300 px-8 rounded-md"></span>
                                        </div>
                                        <div className="flex items-center gap-1 w-full">
                                            <span className="py-5 text-gray-300 bg-gray-300 px-12 rounded-md font-bold" >

                                            </span>
                                            <span className=" text-gray-300 px-2 rounded-md font-extrabold text-xl" >
                                                %
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-2 px-4 sm:px-8 py-3 sm:py-0 border-b sm:border-b-0 sm:border-r">
                                        <div className="flex flex-col gap-2 text-center text-lg sm:text-xl">
                                            <span className="py-3 bg-gray-300 px-8 rounded-md"></span>
                                            <span className="py-3 bg-gray-300 px-8 rounded-md"></span>
                                        </div>
                                        <span className="py-5 text-gray-300 bg-gray-300 px-12 rounded-md font-bold" />
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-2 px-4 sm:px-8 py-3 sm:py-0 border-b sm:border-b-0 sm:border-r">
                                        <div className="flex flex-col gap-2 text-center text-lg sm:text-xl">
                                            <span className="py-3 bg-gray-300 px-8 rounded-md"></span>
                                            <span className="py-3 bg-gray-300 px-8 rounded-md"></span>
                                        </div>
                                        <span className="py-5 text-gray-300 bg-gray-300 px-12 rounded-md font-bold" />
                                    </div>
                                </div>
                                <button className="py-6 px-24 bg-gray-300 mb-2 rounded-full" />
                            </div>
                            {/* Amenities */}
                            <div>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[color:var(--orange)] dark:text-[color:var(--yellow)]">
                                    Amenities
                                </h2>
                                <ul className="grid grid-cols-2 gap-12 my-12">
                                    {[...Array(4)].map((amenity, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-[#212121] dark:bg-white"></span>
                                            <span className="py-3 px-8 bg-gray-300 mb-2 rounded-md" />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    : <div className="mt-6 text-lg sm:text-xl md:text-3xl font-semibold px-4 text-center mx-auto"> Could not fetch property</div>
            }
            <Footer />
        </Fragment>
    );
};

export default Property;
