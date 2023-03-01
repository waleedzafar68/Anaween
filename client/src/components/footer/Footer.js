const Footer = () => {
  return (
    <footer className="flex justify-between flex-col w-full gap-6 md:flex-row mx-auto py-10 bg-white dark:bg-[#212121] md:px-8 lg:px-24 xl:px-44 2xl:px-52 border-t-2 border-[color:var(--orange)] dark:border-[color:var(--yellow)]">
      <div className="flex flex-col items-center">
        <span className="text-2xl text-black dark:text-white">Subscribe</span>
        <span className="text-sm my-6 text-black dark:text-white w-[18rem] sm:w-[26rem] lg:w-[28rem] text-center">
          Sign up to get regular updates about market trends, hot opportunities,
          and new feature releases:
        </span>
        <div className="grid grid-cols-1">
          <input
            type={"text"}
            placeholder="Email"
            className="px-4 py-[0.35rem] text-sm text-[#212121] border-2 border-[color:var(--orange)] dark:border-[color:var(--yellow)] rounded-md outline-none w-64"
          />
          <button
            type="button"
            className="bg-[color:var(--orange)] text-white px-8 py-[0.35rem] my-2 rounded-md w-64 text-center"
          >
            Subscribe
          </button>
        </div>
      </div>
      <div className="flex flex-col text-center">
        <span className="text-2xl text-black dark:text-white">Contact Us</span>
        <span className="mb-2 mt-4 text-black dark:text-white">
          Lorem ipsum dolor sit amet, 5th st. Cairo, Egypt
        </span>
        <span className="text-black dark:text-white">info@anaween.com</span>
        <span className="text-[color:var(--orange)] my-2">
          01001001199
        </span>
        <div className="flex justify-center gap-8 mt-4">
          <i className="fab fa-facebook text-3xl text-[color:var(--orange)] dark:text-[color:var(--yellow)]"></i>
          <i className="fab fa-twitter text-3xl text-[color:var(--orange)] dark:text-[color:var(--yellow)]"></i>
          <i className="fab fa-instagram text-3xl text-[color:var(--orange)] dark:text-[color:var(--yellow)]"></i>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
