import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BoxHeader from "../../components/UI/BoxHeader";
import AdminCard from "../../components/UI/AdminCard";
import MainHeader from "../../components/Navigation/MainHeader";
import Input from "../../components/UI/Input";
import FormButton from "../../components/UI/FormButton";
import DataTable from "../../components/UI/DataTable";
import Paginator from "../../components/UI/paginator";
import { useForm } from "../../hooks/form-hook";
import { addLocation, deleteLocation, getLocations, updateLocation } from "../../../redux/locations/action";

function AddLocation() {
  const dispatch = useDispatch()

  const locationReducer = useSelector((state) => state.locationReducer);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const tableBodyList = locationReducer.data?.results || []
  const count = locationReducer.data?.count || 0
  const loading = locationReducer.loading || 0
  const [edit, setEdit] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [resetForm, setResetForm] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  const [formState, inputHandler] = useForm({
    Location: "",
  });

  const [state, setState] = useState({
    tableBodyList: [],
    dialogInfo: {
      isOpened: false,
      text: "",
      type: "",
    },
  });

  function deleteFromTable(data) {
    dispatch(deleteLocation(data._id))
  }

  const editHandler = (data) => {
    setUpdateData(data);
    setUpdateName(data.Location);
  };
  const editCancelHandler = () => {
    if (edit) setEdit(false);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    updateData
      ?
      dispatch(updateLocation({
        id: updateData._id,
        data: formState
      }, {}))
      :
      dispatch(addLocation(formState, {}))

    setResetForm(true);
    setUpdateData(null);
  };

  useEffect(() => {
    dispatch(getLocations({
      page: page + 1,
      limit: limit,
    }))
  }, [limit, page]);

  const [tableHeaders, setTableHeaders] = useState([
    { id: "_id", label: "ID" },
    { id: "Location", label: "Name" },
    {
      id: "actions",
      label: "",
      component: (data, setData) => (
        <div className="space-x-3 !text-right">
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
  ]);
  return (
    <section className="content">
      <MainHeader type="Masters" subtype="Add Location" />
      <div className="grid grid-cols-1 md:grid-cols-[2fr,3fr] gap-3 md:gap-5 w-full p-2">
        <AdminCard className="h-fit">
          <div className="box box-primary">
            <BoxHeader title={`${updateData ? "Update" : "Add"} Location`} />
            <form
              onSubmit={onSubmitHandler}
              className="flex flex-col gap-4 pt-2 px-2"
            >
              <Input
                label={"Name"}
                id={"Location"}
                name={"Location"}
                updateValue={updateName}
                setUpdateValue={setUpdateName}
                resetForm={resetForm}
                setResetForm={setResetForm}
                onInput={inputHandler}
                required
              />
              <FormButton onClick={editCancelHandler}>
                {updateData ? "Update" : "Save"}
              </FormButton>
            </form>
          </div>
        </AdminCard>
        <AdminCard className="relative">
          <div className="box box-primary">
            <BoxHeader title="Added Locations" />
            <div className="col-md-12">
              <div className="h-fit rounded-lg bg-white mb-6 shadow-md">
                <DataTable
                  isLoading={loading}
                  tableHeadersData={tableHeaders}
                  setTableHeadersData={setTableHeaders}
                  tableBodyData={tableBodyList || []}
                />
              </div>
              <div className="absolute bottom-0 w-[-webkit-fill-available] z-50">
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
    </section>
  );
}

export default AddLocation;
