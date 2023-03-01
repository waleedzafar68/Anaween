const BlogCard = ({ data, textLength, imageClass, bold, onClick }) => {

  return (
    <div className="grid grid-col-1 lg:grid-cols-2 md:gap-4 outline outline-[2px] outline-transparent hover:outline-[color:var(--primary-color)] border-2 border-[color:var(--orange)] dark:border-[color:var(--yellow)] shadow-[-7px_10px_2px_0px_rgba(219,92,28,0.4)] dark:shadow-[-7px_10px_2px_0px_rgba(233,177,93,0.4)] rounded-md overflow-hidden" onClick={onClick}>
      <div className="flex flex-col gap-6 text-black dark:text-white pl-5 pr-4 pt-5 pb-4 sm:pb-8 lg:pb-3 text-sm sm:text-base md:text-lg order-2 lg:order-1">
        {/* <p>{data.Description.slice(0, 600)}{data.Description.length > 600 && "..."} */}
        {/* <p dangerouslySetInnerHTML={{ __html: data.Description.slice(0, textLength) }}> */}
        <div className="flex flex-col gap-4">
          <p className={`${bold && 'text-lg sm:text-xl font-semibold'}`}>{data.Title}
          </p>
          <p dangerouslySetInnerHTML={{ __html: data.Description.slice(0, textLength) }}></p>
        </div>
        {/* {data.Description.length > 600 && <button className="border-2 w-fit self-end rounded-full py-1 px-3 text-sm md:text-base hover:!text-[color:var(--secondary-color)] border-[color:var(--yellow)] dark:border-[color:var(--yellow)]"> */}
        {<button className="border-2 w-fit self-end rounded-full py-1 px-3 text-sm md:text-base hover:!text-[color:var(--secondary-color)] border-[color:var(--yellow)] dark:border-[color:var(--yellow)]">
          Read More
        </button>}
      </div>
      <div className={`${imageClass} w-full order-1`}>
        <img src={`${process.env.REACT_APP_ATLAS_URL}/file/${data.Image}`} className="h-full w-full" alt="blog" />
      </div>
    </div >
  );
};

export default BlogCard;
