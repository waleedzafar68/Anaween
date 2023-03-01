import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "../../components/UI/DataTable";
import Dialog from "../../components/UI/Dialog";
import BoxHeader from "../../components/UI/BoxHeader";
import Paginator from "../../components/UI/paginator";
import MainHeader from "../../components/Navigation/MainHeader";
import AdminCard from "../../components/UI/AdminCard";
import { deleteProperty, getProperties } from "../../../redux/properties/action";

function ViewAllProperties() {
  const dispatch = useDispatch()
  const propertyReducer = useSelector((state) => state.propertyReducer);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const tableBodyList = propertyReducer.data?.results || []
  const count = propertyReducer.data?.count || 0
  const loading = propertyReducer.loading || 0

  const navigate = useNavigate();

  const [state, setState] = useState({
    tableBodyList: [],
    dialogInfo: {
      isOpened: false,
      text: "",
      type: "",
    },
  });

  function deleteFromTable(data) {
    dispatch(deleteProperty(data._id))
  }

  const editHandler = (data) => {
    navigate("/admin/addProperty", { state: data });
  };

  const [tableHeaders, setTableHeaders] = useState([
    { id: "_id", label: "ID" },
    { id: "Name", label: "Name" },
    { id: "InstallmentYears", label: "Installment Years" },
    { id: "Delivery", label: "Delivery" },
    { id: "DownPayment", label: "Down Payment" },
    { id: "Price", label: "Price" },
    { id: "Address", label: "Address" },
    { id: "City", label: "City" },
    { id: "Country", label: "Country" },
    // {
    //   id: "_Amenities",
    //   label: "Amenities",
    //   component: (data, setData) => {
    //     return data._Amenities.map((x, index) => (
    //       <Fragment key={index}>
    //         {x.Name}
    //         <br />
    //       </Fragment>
    //     ));
    //   },
    // },
    { id: "Images", label: "Images", component: (data, setData) => <><img className="w-20 h-auto" src={`${process.env.REACT_APP_ATLAS_URL}/file/${data.Images.length > 0 && data.Images[0]}`} alt="property" /></> },

    {
      id: "actions",
      label: "",
      component: (data, setData) => (
        <div className="flex space-x-3 !text-right">
          <button
            className=" no-focus"
            title="Edit"
            onClick={() => {
              editHandler(data);
            }}
          >
            <i className="fas fa-pencil" aria-hidden="true"></i>
          </button>
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
    // { id: "Unit_PropertyType", label: "Units", component: (data, setData) => { return <>{data.Unit_PropertyType.map(x => <>{x.Name}<br /></>)}</> } },\
  ]);

  useEffect(() => {
    dispatch(getProperties({
      page: page + 1,
      limit: limit,
    }))
  }, [limit, page]);

  // To remove token from session storage;

  useEffect(() => {
    setTimeout(() => {
      sessionStorage.removeItem('accessToken');
    }, 60 * 60 * 1000);
  }, [])

  return (
    <div>
      <MainHeader type="Properties" subtype="View All Properties" />
      <div className="relative content p-2">
        <AdminCard>
          <div className="relative">
            <BoxHeader title="Properties List" />
            <div className="row">
              <Dialog
                onFalse={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    dialogInfo: { isOpened: false, text: "" },
                  }))
                }
                onTrue={(e) => deleteFromTable(e)}
                dialogInfo={state.dialogInfo}
              />
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
          </div>
        </AdminCard>
      </div>
    </div>
  );
}

export default ViewAllProperties;
