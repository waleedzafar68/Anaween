import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import BlogCard from "../../components/blogs/BlogCard"
import { getBlogs } from "../../redux/blogs/action";

const Blogs = () => {
    const navigate = useNavigate();
    const blogReducer = useSelector((state) => state.blogReducer);
    const blogData = blogReducer.data?.results || []
    const loading = blogReducer.loading || 0
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBlogs());
    }, []);

    return (
        <div className="pb-16 px-6 sm:px-10 md:px-16 xl:px-20">
            <h2 className="text-4xl font-bold text-[color:var(--orange)] dark:text-[color:var(--yellow)] my-6 md:my-12">
                BLOGS
            </h2>
            {!loading ? <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 lg:gap-10 xl:gap-16">
                {blogData.map((data, index) => (
                    <BlogCard data={data} key={index} imageClass="h-auto md:h-[28rem]" bold textLength={600} onClick={() => navigate('/blog', { state: data })} />
                ))}
            </div>
                : <div className="grid grid-cols-1 gap-12">
                    {[...Array(4)].map((val, index) => (
                        <div className="animate-pulse grid grid-col-1 lg:grid-cols-2 gap-10 rounded-md border-2 overflow-hidden dark:border-gray-400 shadow-[-7px_10px_2px_0px_rgba(0,0,0,0.4)] dark:shadow-black">
                            <div className="flex flex-col gap-8 pl-5 pr-4 pt-5 order-2 lg:order-1">
                                <p className="bg-gray-300 h-[12rem] rounded-md">
                                </p>
                                <button className="border-2 w-fit self-end rounded-full bg-gray-300 py-4 px-10">

                                </button>
                            </div>
                            <div className="h-[29rem] w-full order-1 bg-gray-200 rounded-md">

                            </div>
                        </div>))}
                </div>
            }
        </div>
    )
}

export default Blogs;