import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "../../components/UI/DataTable";
import Dialog from "../../components/UI/Dialog";
import BoxHeader from "../../components/UI/BoxHeader";
import Paginator from "../../components/UI/paginator";
import MainHeader from "../../components/Navigation/MainHeader";
import AdminCard from "../../components/UI/AdminCard";
import { deleteAppraisal, getAppraisals } from "../../../redux/appraisals/action";

function ViewAppraisals() {
    const dispatch = useDispatch()
    const appraisalReducer = useSelector((state) => state.appraisalReducer);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(50);
    const tableBodyList = appraisalReducer.data?.results || []
    const count = appraisalReducer.data?.count || 0
    const loading = appraisalReducer.loading || 0

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
        dispatch(deleteAppraisal(data._id))
    }

    const editHandler = (data) => {
        navigate("/admin/addProperty", { state: data });
    };

    const [tableHeaders, setTableHeaders] = useState([
        { id: "_id", label: "ID" },
        { id: "UserName", label: "Property Name" },
        { id: "Name", label: "Name" },
        { id: "Project_Developer", label: "Project Developer" },
        { id: "AreaSize", label: "Area Size" },
        { id: "Location", label: "Location" },
        { id: "Type", label: "Type" },
        { id: "Description", label: "Description", component: (data, setData) => { return <span className="lg:w-[5rem]">{data.Description}</span> } },
        { id: "Email", label: "Email" },
        { id: "Phone", label: "Phone" },
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

        {
            id: "actions",
            label: "",
            component: (data, setData) => (
                <div className="flex space-x-3 !text-right">
                    <button
                        className=" no-focus text-[1.04rem]"
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
        dispatch(getAppraisals({
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
            <MainHeader type="Appraisals" subtype="View All Appraisals" />
            <div className="relative content p-2">
                <AdminCard>
                    <div className="relative">
                        <BoxHeader title="Appraisals List" />
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

export default ViewAppraisals;
