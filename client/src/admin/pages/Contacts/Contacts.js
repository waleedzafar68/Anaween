import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getContacts, deleteContact } from "../../../redux/contacts/action";
import DataTable from "../../components/UI/DataTable";
import BoxHeader from "../../components/UI/BoxHeader";
import Paginator from "../../components/UI/paginator";
import MainHeader from "../../components/Navigation/MainHeader";
import AdminCard from "../../components/UI/AdminCard";

const Contacts = () => {
  const dispatch = useDispatch();
  const contactReducer = useSelector(state => state.contactReducer)
  const tableBodyList = contactReducer.data?.results || []
  const loading = contactReducer.loading || 0
  const count = contactReducer.data?.count || 0
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    dispatch(getContacts());
  }, [page, limit]);

  function deleteFromTable(data) {
    dispatch(deleteContact(data._id))
  }

  const [tableHeaders, setTableHeaders] = useState([
    { id: "_id", label: "ID" },
    { id: "Name", label: "Name" },
    { id: "Message", label: "Message" },
    { id: "PhoneNumber", label: "Phone Number" },
    { id: "PropertyName", label: "Property Name" },
    { id: "PreferedLocation", label: "Prefered Location" },
    {
      id: "Date",
      label: "Date",
      component: (data) => (
        <>{data.Date && new Date(data.Date)?.toDateString()}</>
      ),
    },
    {
      id: "Time",
      label: "Time",
      component: (data) => (
        <>
          {data.Time &&
            new Date(data.Time)?.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
        </>
      ),
    },
    {
      id: "actions",
      label: "",
      component: (data, setData) => (
        <div className="flex space-x-3 !text-right">
          <button
            className=" no-focus"
            title="Delete"
            onClick={(e) => deleteFromTable(data)}
          >
            <i className="fas fa-times text-[color:var(--primary-color)]" aria-hidden="true"></i>
          </button>
        </div>
      ),
    },
  ]);
  return (
    <div>
      <MainHeader type="Contacts" subtype="View All Contacts" />
      <div className="relative content p-2">
        <AdminCard>
          <div className="relative">
            <BoxHeader title="Contacts List" />
            <div className="h-fit flex w-full rounded-lg bg-white mb-12 shadow-md">
              <DataTable
                isLoading={loading}
                tableHeadersData={tableHeaders}
                setTableHeadersData={setTableHeaders}
                tableBodyData={tableBodyList}
              />
            </div>
            <div className="fixed bottom-0 w-[-webkit-fill-available] z-50">
              <Paginator
                page={page}
                setPage={setPage}
                limit={limit}
                setLimit={setLimit}
                total={count}
              />
            </div>
          </div>
        </AdminCard>
      </div>
    </div>
  );
};

export default Contacts;
