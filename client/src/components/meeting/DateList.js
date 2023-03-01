import { useEffect, useState } from "react";
import Card from "./Card";
const DateList = ({ dates, selectedDate, dateChangeHandler }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let monthsArray = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const onClickHandler = (item) => {
    dateChangeHandler(item.date);
    setActiveIndex(item.index);
  };

  useEffect(() => {
    if (!selectedDate) {
      setActiveIndex(null);
    }
  }, [selectedDate]);
  return dates.map((date, index) => {
    return (
      <Card className="!p-0 shadow-[-1px_3px_7px_0px_rgba(0,0,0,0.4)] !inline-block" key={index}>
        <ul
          className={`${activeIndex === index
            ? "text-[color:var(--primary-color)]"
            : "bg-white text-[#212020]"
            } px-2 md:px-4 py-3 sm:py-4 md:py-6 rounded-lg text-sm text-center font-semibold cursor-pointer`}
          onClick={() => onClickHandler({ index, date })}
        >
          <li>{weekday[new Date(date.date).getDay()]}</li>
          <li>
            {new Date(date.date).getDate()}{" "}
            {monthsArray[new Date(date.date).getMonth()]}
          </li>
        </ul>
      </Card>
    );
  });
};

export default DateList;
