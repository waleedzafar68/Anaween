import AccordianSubTabs from "./AccordianSubTabs";

const Accordion = (props) => {
  return (
    <div className="mt-2 px-2 w-11/12 mb-32">
      <div
        className={`flex gap-3 items-center text-lg md:text-2xl xl:text-3xl border-y-[3px] border-black dark:border-white text-[color:var(--orange)] dark:text-[color:var(--yellow)] py-5 cursor-default mb-3 font-gillsans`}
      >
        <div>
          <i className="fa-sharp text-xs -translate-y-1 fa-solid fa-circle text-[color:var(--orange)] dark:text-[color:var(--yellow)]"></i>
        </div>
        <h4>Unit Types</h4>
      </div>
      <div
        className={`text-white sm:pl-4 md:pl-8 lg:pl-12 mt-8 transition-all duration-100`}
      >
        <AccordianSubTabs {...props} />
      </div>
    </div>
  );
};

export default Accordion;
