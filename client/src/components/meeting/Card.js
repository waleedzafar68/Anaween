const Card = (props) => {
  return (
    <div
      className={`${props.className} relative inline-flex items-center gap-4 py-2 px-4 w-fit accordian-shadow rounded-xl m-2`}
    >
      {props.children}
    </div>
  );
};
export default Card;
