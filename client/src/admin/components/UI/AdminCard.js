const AdminCard = (props) => {
  return (
    <div
      className={`${props.className} row bg-white text-[#212020] card-shadow border-[color:var(--primary-color)] border-t-4 rounded-sm font-open-sans mb-6`}
    >
      {props.children}
    </div>
  );
};
export default AdminCard;
