import React, { useState, useEffect, Fragment } from "react";
const DataTable = ({
  tableHeadersData,
  tableBodyData,
  reference,
  onRowClick,
  rowClickEnabled,
  isLoading,
}) => {
  const [tableHeaders, setTableHeaders] = useState(tableHeadersData);
  const [tableBody, setTableBody] = useState(tableBodyData);

  useEffect(() => {
    setTableBody(tableBodyData);
  }, [tableBodyData]);

  useEffect(() => {
    setTableHeaders(tableHeadersData);
  }, [tableHeadersData]);

  function getColumnLabel(id) {
    const col = tableHeaders && tableHeaders.filter((x) => x.id === id)[0];
    return col ? <>{col.label}</> : "na";
  }

  function getColumnComponent(id, row) {
    const col = tableHeaders.filter((x) => x.id === id.id)[0];
    return (
      col && (col.component ? col.component(row, setTableBody) : row[id?.id])
    );
  }

  return (
    <div className="min-h-full rounded-lg bg-white pt-4 shadow-md min-w-full">
      <div className="flex flex-col">
        <div className="overflow-x-auto min-h-[22rem]">
          <div className="flex flex-col">
            <div className="shadow-table rounded-lg z-11">
              <table
                className="min-w-full divide-y divide-gray-300 border-separate border-spacing-y-0"
                id="data-table"
              >
                <thead className="bg-gray-100 w-full ">
                  <tr>
                    {tableHeaders &&
                      tableHeaders.map((header, index) => (
                        <th
                          scope="col"
                          className="items-center py-3.5 px-4 text-left text-xs font-semibold text-gray-700 uppercase"
                          key={index}
                        >
                          {header.label}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {/* <!-- Selected: "bg-gray-50" --> */}
                  {!isLoading
                    ? tableBody &&
                    tableBody.map((row, index) => (
                      <tr
                        key={index}
                        className={`${index % 2 === 0 ? "bg-[#ffffff]" : "bg-gray-50"
                          }`}
                      >
                        {tableHeaders &&
                          tableHeaders.map((col, index) => (
                            <Fragment key={index}>
                              {rowClickEnabled ? (
                                <td
                                  key={index}
                                  onClick={() => onRowClick(row)}
                                  className="cursor-pointer whitespace-nowrap py-4 pr-3 text-xs font-medium text-gray-900"
                                >
                                  {getColumnComponent(col, row)}
                                </td>
                              ) : (
                                <>
                                  <td className="py-4 px-4 text-xs font-medium text-gray-900">
                                    {getColumnComponent(col, row)}
                                  </td>
                                </>
                              )}
                            </Fragment>
                          ))}
                      </tr>
                    ))
                    : [...Array(8)].map((val, index) => (
                      <tr className={` animate-pulse p-2`} key={index}>
                        <td className="p-1 flex gap-x-3 ml-2">
                          <div className="h-4 bg-gray-200 mt-1 mb-1 rounded-lg w-5 border"></div>
                          <div className="h-4 bg-gray-200 mt-1 mb-1 rounded-lg w-[70%]"></div>
                        </td>

                        {tableHeaders &&
                          tableHeaders.map((col, index) => (
                            <td key={index}>
                              <div className="h-4 bg-gray-200 mt-1 mb-1 rounded-lg w-[70%]"></div>
                            </td>
                          ))}
                      </tr>
                    ))}
                </tbody>
                <tbody>
                  {tableBody && tableBody?.length === 0 && !isLoading && (
                    <Fragment>
                      <tr className="odd">
                        <td
                          valign="top"
                          colSpan="12"
                          className="dataTables_empty pt-5"
                        >
                          <div
                            align="center"
                            className="text-red-500 align-center justify-center"
                          >
                            <img
                              alt="Empty Table"
                              src="/addnewitem.svg"
                              className="justify-center mx-auto py-5"
                            />
                            <p className="text-success text-bold font-medium text-black p-2">
                              No data available in table.
                            </p>
                            <p className="text-success text-sm font-medium text-gray-500 pb-5">
                              Add new record or search with different criteria.
                            </p>
                          </div>
                        </td>
                      </tr>
                    </Fragment>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
