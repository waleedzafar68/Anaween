import { useState } from "react";

const ReadMore = ({ children, length }) => {

    const [isReadMore, setIsReadMore] = useState(
        window.screen.width <= 768 ? true : false
    );

    const text = children;
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="my-2 md:my-4 lg:my-5 font-light leading-8 sm:pr-8 md:pr-12 lg:pr-16">
            {isReadMore ? text.slice(0, 150) : text}
            <span onClick={toggleReadMore} className="font-semibold text-sm">
                {isReadMore && text.length > 150 ? "...read more" : text.length > 150 ? " show less" : ""}
            </span>
        </p>
    );
};

export default ReadMore;