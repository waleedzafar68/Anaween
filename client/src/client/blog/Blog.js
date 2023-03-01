import { useLocation } from "react-router-dom";

const Blog = () => {
    const location = useLocation();
    const blog = location.state;

    return <div className="flex flex-col gap-8 px-4 sm:px-6 md:px-8 lg:px-12 2xl:px-28 mt-6">
        <div className="text-center h-full w-full">
            <img src={`${process.env.REACT_APP_ATLAS_URL}/file/${blog.Image}`} alt="blog" className="h-full w-11/12 sm:w-10/12 md:w-3/4 lg:w-4/6 mx-auto" />
        </div>
        <h3 className="text-lg md:text-2xl lg:text-3xl font-semibold">
            {blog.Title}
        </h3>
        <p dangerouslySetInnerHTML={{ __html: blog.Description }}></p>
    </div>
}

export default Blog;