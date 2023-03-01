const Card = (props) => {
    return (
        <div
            className={`${props.className} relative inline-flex items-center gap-4 py-2 px-4 w-fit bg-white dark:bg-[#212121] border-2 border-[color:var(--orange)] dark:border-[color:var(--yellow)] shadow-[-7px_10px_2px_0px_rgba(219,92,28,0.4)] dark:shadow-[-7px_10px_2px_0px_rgba(233,177,93,0.4)] rounded-xl m-2`}
        >
            {props.children}
        </div>
    );
};
export default Card;
