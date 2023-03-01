const FormButton = (props) => {
  return (
    <div
      className={`${props.containerClass} box-footer flex items-center w-full justify-end border-t p-2`}
    >
      <button
        type={props.type || "submit"}
        className={`btn ${props.buttonClass} text-white font-semibold text-sm bg-[color:var(--primary-color)] px-3 py-1 rounded-md font-open-sans hover:text-[color:var(--secondary-color)]`}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    </div>
  );
};
export default FormButton;
