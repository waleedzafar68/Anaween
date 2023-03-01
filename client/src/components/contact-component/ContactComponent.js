
import { useNavigate } from "react-router-dom";

const Contact = ({ outerContainerClassName = "", innerContainerClassName = "", propertyName = "" }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${outerContainerClassName} grid grid-cols-3 gap-2 sm:gap-3 w-full sm:w-fit font-cairo tracking-normal sm:tracking-wide`}
    >
      <a
        href="tel:+201286663558"
        className="flex items-center gap-1 px-4 sm:px-8 justify-center cursor-pointer rounded-3xl py-1 group border-2 border-[color:var(--orange)] dark:border-[color:var(--yellow)]"
      >
        <i className="fas fa-phone text-[color:var(--orange)] dark:text-[color:var(--yellow)]"></i>
        <span className={`${innerContainerClassName} text-black dark:text-white group-hover:!text-[color:var(--primary-color)] text-xs`}>
          Call
        </span>
      </a>
      <a
        href="whatsapp://send?text=Lets chat!&phone=+201286663558"
        className="flex items-center gap-1 px-4 sm:px-8 justify-center cursor-pointer rounded-3xl py-1 group border-2 border-[color:var(--orange)] dark:border-[color:var(--yellow)]"
      >
        <i className="fa-brands fa-whatsapp text-xl text-[color:var(--orange)] dark:text-[color:var(--yellow)]"></i>
        <span
          className={`${innerContainerClassName} text-black dark:text-white group-hover:!text-[color:var(--primary-color)] text-xs text-center`}
        >
          Whatsapp
        </span>
      </a>

      <span
        className="flex gap-2 py-1 px-4 sm:px-8 items-center cursor-pointer rounded-3xl justify-center group border-2 border-[color:var(--orange)] dark:border-[color:var(--yellow)]"
        onClick={() => navigate("/meeting", { state: propertyName })}
      >
        <i className="fas fa-video text-[color:var(--orange)] dark:text-[color:var(--yellow)]"></i>
        <span className={`${innerContainerClassName} text-black dark:text-white group-hover:!text-[color:var(--primary-color)] text-xs`}>
          Meeting
        </span>
      </span>
    </div>
  );
};
export default Contact;
