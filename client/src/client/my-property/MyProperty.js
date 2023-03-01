import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import MyPropertyCard from "../../components/my-property/MyPropertyCard";
import { getUserProperty } from "../../redux/user-properties/action";
import ContactComponent from "../../components/contact-component/ContactComponent";
import Footer from "../../components/footer/Footer";
import { fCurrency } from "../../utils/formatNumber";
import PrevBtn from "../../components/swiperjs/PrevBtn";
import NextBtn from "../../components/swiperjs/NextBtn";
import ReadMore from "../../components/my-property/ReadMore";

const MyProperty = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const userPropertyReducer = useSelector((state) => state.userPropertyReducer);
    let data = userPropertyReducer.data?.results[0] || null;
    const loading = userPropertyReducer.loading || 0

    useEffect(() => {
        dispatch(getUserProperty(params.id));
        window.scrollTo(0, 0)
    }, []);

    return (
        data ? <Fragment>
            <div className="absolute left-10 lg:left-14 -top-2 h-fit z-20 hidden md:block w-full overflow-hidden pb-2">
                <div className="w-[0.4rem] h-32 lg:h-[9rem] bg-[color:var(--orange)]"></div>
                <div className="absolute top-32 lg:top-[9rem] left-0 w-[2rem] h-1 md:h-[0.4rem] bg-[color:var(--orange)]"></div>
                <div className="absolute top-32 lg:top-[8.9rem] left-11 w-2 h-2 rounded-full border-2 border-[color:var(--yellow)] bg-[color:var(--yellow)]"></div>
            </div>
            <div className="flex flex-col gap-6 lg:gap-6 px-4 sm:px-8 md:px-16 lg:px-20 pb-8 text-black dark:text-white">
                <div className="relative md:-translate-y-2 flex flex-col sm:gap-2 ml-4 sm:ml-8 md:ml-0 sm:mb-4 lg:mb-12 text-2xl md:text-3xl lg:text-4xl text-white font-semibold">
                    <h2 className="text-black dark:text-white">Your </h2>
                    <h2 className="text-[color:var(--yellow)] dark:text-[color:var(--orange)]">
                        Properties
                    </h2>
                </div>

                {/* My Property Card */}
                <MyPropertyCard data={data} />

                {/* Amenities & Property Details*/}
                <div className="grid md:grid-cols-2 items-start sm:gap-4 md:gap-6 my-2 sm:my-4 md:my-8 overflow-hidden">
                    <div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[color:var(--yellow)] dark:text-[color:var(--orange)]">
                            Amenities
                        </h2>
                        <ul className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 my-8 lg:my-12">
                            {data._Amenities.map((amenity, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <span className="h-1 w-1 rounded-full bg-[#212121] dark:bg-white"></span>
                                    <span className="sm:text-xl font-light">{amenity.Name}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-col gap-2 sm:gap-4 md:gap-6">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[color:var(--yellow)] dark:text-[color:var(--orange)]">
                                Property Details
                            </h2>
                            {/* <span className="pr-20">{property.Details}</span> */}
                            <ReadMore length={180}>{data.Description}</ReadMore>
                        </div>
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
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[color:var(--primary-color)] dark:text-[color:var(--secondary-color)]">
                            Description
                        </h2>
                        <ReadMore length={180}>{data.Description}</ReadMore>
                    </div>
                    <div className="flex flex-col gap-8 items-center justify-center">
                        <h2 className="text-3xl sm:text-4xl xl:text-5xl text-center">
                            Updated Market Price
                        </h2>
                        <span className="text-3xl sm:text-4xl xl:text-5xl font-semibold text-[color:var(--primary-color)] dark:text-[color:var(--secondary-color)]">
                            EGP {fCurrency(data.MarketPrice)}
                        </span>
                        <ContactComponent />
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment> : loading && !data ?
            // Skeleton
            <div className="animate-pulse flex flex-col gap-8 px-4 sm:px-8 md:px-16 lg:px-20 pb-8 text-black dark:text-white">
                {/*  Property card */}
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
                    <div className="w-full h-[20rem] sm:h-[24rem] lg:h-[32rem] 2xl:h-[36rem] order-1 lg:order-2">
                        {/* <div className="w-full h-[20rem] sm:h-[24rem] lg:h-[32rem] 2xl:h-[36rem] order-1 lg:order-2"> */}
                        <div className="bg-gray-300 w-full h-full" />
                    </div>
                </div >
                <div className="grid md:grid-cols-2 items-start gap-6 my-8 overflow-hidden">
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
                        <div className="flex flex-col gap-4">
                            <p className="bg-gray-300 py-3 rounded-md w-10/12"></p>
                            <p className="bg-gray-300 py-3 rounded-md w-10/12"></p>
                            <p className="bg-gray-300 py-3 rounded-md w-10/12"></p>
                            <p className="bg-gray-300 py-3 rounded-md w-10/12"></p>
                        </div>
                    </div>
                    {/* Map */}
                    <div className="rounded-[1.2rem] overflow-hidden bg-gray-300 ">
                        <div className="relative w-full h-[450px]">
                            <div
                                className="!w-full overflow-hidden myMap absolute"
                            />
                        </div>
                    </div>
                </div>
            </div>
            : <div className="mt-6 text-lg sm:text-xl md:text-3xl font-semibold px-4 text-center mx-auto"> Could not fetch property</div>
    );
};

export default MyProperty;
