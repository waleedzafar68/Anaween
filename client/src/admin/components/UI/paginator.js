import { Fragment } from "react";
import { useEffect, useState } from "react";

const Paginator = ({ limit = 20, setLimit, page = 0, setPage, total = 20 }) => {
  const [pageNumbers, setPageNumbers] = useState([
    ...Array(Math.ceil(total / limit)),
  ]);

  useEffect(() => {
    setPageNumbers([...Array(Math.ceil(total / limit))]);
  }, [limit, page, total]);

  const pageChangeHandler = (e) => {
    setLimit(e.target.value);
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:items-center sm:justify-between w-full">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{page * limit + 1}</span> -{" "}
            <span className="font-medium">
              {page + 1 !== pageNumbers.length ? page * limit + limit : total}{" "}
            </span>{" "}
            of <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex rounded-md w-full"
            aria-label="Pagination"
          >
            <div className="relative inline-flex items-center gap-2 mr-4">
              <span className="text-sm font-medium text-gray-500">
                Rows per page:
              </span>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block p-2.5 w-fit"
                onChange={pageChangeHandler}
                defaultValue={limit}
              >
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
                <option value="125">125</option>
                <option value="150">150</option>
                <option value="175">175</option>
                <option value="200">200</option>
              </select>

              {/* <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center items-center rounded-lg border ml-2 mr-4 border-gray-300 bg-white p-2 text-xs font-medium text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    {limit}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-3 bottom-10  z-10  w-fit  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
                    <div className="py-1">

                      <Menu.Item>
                        {({ active }) => (
                          <div onClick={() => setLimit(5)} className={`${active ? 'bg-gray-100' : 'bg-white'} px-4`}>
                            5
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div onClick={() => setLimit(10)} className={`${active ? 'bg-gray-100' : 'bg-white'} px-4`}>
                            10
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div onClick={() => setLimit(20)} className={`${active ? 'bg-gray-100' : 'bg-white'} px-4`}>
                            20
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div onClick={() => setLimit(50)} className={`${active ? 'bg-gray-100' : 'bg-white'} px-4`}>
                            50
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div onClick={() => setLimit(100)} className={`${active ? 'bg-gray-100' : 'bg-white'} px-4`}>
                            100
                          </div>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu> */}
            </div>
            <div
              onClick={() => page !== 0 && setPage(page - 1)}
              className={`${
                page <= 0 ? "cursor-not-allowed" : "cursor-pointer"
              } relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20`}
            >
              <span className="">Previous</span>
            </div>
            {pageNumbers &&
              pageNumbers.map((currentPage, index) => {
                return (
                  <a
                    onClick={() => page !== index && setPage(index)}
                    className={`cursor-pointer relative z-10 inline-flex items-center border ${
                      index === page
                        ? "border-blue-500 text-blue-600 bg-blue-50 !cursor-not-allowed"
                        : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"
                    } px-4 py-2 text-sm font-medium focus:z-20`}
                    key={index}
                  >
                    {index + 1}
                  </a>
                );
              })}
            <div
              onClick={() =>
                page + 1 !== pageNumbers.length && setPage(page + 1)
              }
              className={`${
                page + 1 !== pageNumbers.length
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              } relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20`}
            >
              <span className="">Next</span>
              {/* <ChevronRightIcon className="h-5 w-5" aria-hidden="true" /> */}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Paginator;
