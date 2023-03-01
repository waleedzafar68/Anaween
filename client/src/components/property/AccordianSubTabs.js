import { Fragment, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "react-transition-group";

import { fCurrency } from "../../utils/formatNumber";
import { getUnitTypes } from "../../redux/unit-types/action";

const AccordianSubTabs = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [subList, setSubList] = useState(null);
  const [activeSubItemIndex, setActiveSubItemIndex] = useState(0);

  const dispatch = useDispatch()
  const unitTypeReducer = useSelector((state) => state.unitTypeReducer);
  const loading = unitTypeReducer.loading || 0;

  const unitTypes = unitTypeReducer.data?.results || [{}];

  const [updatedUnitTypes, setUpdatedUnitTypes] = useState([]);

  const propertyUnitTypes = data.Unit_PropertyType?.map((x) => x.UnitType);
  const nodeRef = useRef(null);

  const createSubLists = () => {
    return updatedUnitTypes.map((type) => {
      return {
        subList: data.Unit_PropertyType
          .filter((x) => x.UnitType === type._id)
          .map((y) => {
            return {
              title: y.UnitName,
              content: [
                {
                  AreaFrom:
                    !y.AreaFrom || y.AreaFrom === "" || y.AreaFrom === 0
                      ? undefined
                      : `${y.AreaFrom}`,
                  AreaTo:
                    !y.AreaTo || y.AreaTo === "" || y.AreaTo === 0
                      ? undefined
                      : `${y.AreaTo}`,
                  Price: `${fCurrency(y.Price)}`,
                },
              ],
            };
          }),
      };
    });
  };

  const [activeSubList, setActiveSubList] = useState(null);

  useEffect(() => {
    if (unitTypes) {
      const newResults = [];
      unitTypes.map((ut) => {
        if (propertyUnitTypes.includes(ut._id)) {
          newResults.push(ut);
        }
      });
      setUpdatedUnitTypes(newResults);
    }
  }, [loading]);

  useEffect(() => {
    if (updatedUnitTypes.length > 0) {
      setSubList(createSubLists);
    }
  }, [updatedUnitTypes])


  useEffect(() => {
    if (!activeIndex && subList) {
      setActiveSubList(subList[0].subList);
    }
  }, [subList]);

  const onClickHandler = (item, index) => {
    setActiveIndex(index);
    setActiveSubList(subList[index].subList);
  };
  const subListClickHandler = (index) => {
    setActiveSubItemIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    dispatch(getUnitTypes());
  }, []);

  return (
    <Fragment>
      <ul className="flex flex-shrink w-fit">
        {updatedUnitTypes && updatedUnitTypes.length > 0 &&
          updatedUnitTypes.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => onClickHandler(item, index)}
                className={`${activeIndex === index
                  ? "font-bold border border-b-0"
                  : "border-b"
                  } px-2 sm:px-8 py-2 cursor-default text-black dark:text-white border-[color:var(--secondary-color)] dark:border-[color:var(--primary-color)]`}
              >
                {item.Name}
              </li>
            );
          })}
      </ul>
      {subList &&
        activeSubList &&
        activeSubList.map((item, index) => {
          return (
            <Fragment key={index}>
              <div
                className={`relative flex items-center justify-between text-sm md:text-base 2xl:text-lg border bg-gray-300 py-2 cursor-pointer font-gillsans px-4 mt-4 text-black w-full`}
                onClick={() => subListClickHandler(index)}
              >
                <span>{item.title}</span>
                <div className="flex gap-12 items-center">
                  <i
                    className={`fas fa-chevron-down ${activeSubItemIndex === index ? "rotate-180" : "rotate-0"
                      } transition-all duration-500`}
                  ></i>
                </div>
              </div>
              <Transition
                in={activeSubItemIndex === index}
                timeout={{ enter: 600, exit: 500 }}
                nodeRef={nodeRef}
                mountOnEnter
                unmountOnExit
              >
                {(state) => (
                  <div
                    className={`${state === "entering"
                      ? "open-accordion"
                      : state === "exiting"
                        ? "close-accordion"
                        : null
                      } my-4 pl-2 sm:pl-4 md:pl-8`}
                  >
                    {item.content.map((subitem, index) => {
                      return (
                        <ul className="text-white" key={index}>
                          {subitem.AreaFrom &&
                            subitem.AreaFrom !== "undefined m²" && (
                              <li>
                                <div className="inline-block w-2 h-2 bg-gray-300 mr-3 border border-[#212121] rounded-full"></div>
                                <span className="text-black dark:text-white">Area From: </span>
                                <span className="text-black dark:text-white">{subitem.AreaFrom} m²</span>
                              </li>
                            )}
                          {subitem.AreaTo &&
                            subitem.AreaTo !== "undefined m²" && (
                              <li>
                                <div className="inline-block w-2 h-2 bg-gray-300 mr-3 border border-[#212121] rounded-full"></div>
                                <span className="text-black dark:text-white">Area To: </span>
                                <span className="text-black dark:text-white">{subitem.AreaTo} m²</span>
                              </li>
                            )}
                          <li>
                            <div className="inline-block w-2 h-2 bg-gray-300 mr-3 border border-[#212121] rounded-full"></div>
                            <span className="text-black dark:text-white">Price: </span>
                            <span className="text-black dark:text-white">{subitem.Price}</span>
                          </li>
                        </ul>
                      );
                    })}
                  </div>
                )}
              </Transition>
            </Fragment>
          );
        })}
    </Fragment>
  );
};
export default AccordianSubTabs;
