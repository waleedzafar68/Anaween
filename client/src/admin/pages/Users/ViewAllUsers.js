import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "../../components/UI/DataTable";
import Dialog from "../../components/UI/Dialog";
import BoxHeader from "../../components/UI/BoxHeader";
import Paginator from "../../components/UI/paginator";
import MainHeader from "../../components/Navigation/MainHeader";
import AdminCard from "../../components/UI/AdminCard";
import { getUsers, deleteUser, updateUserStatus } from "../../../redux/users/action";

function ViewAllUsers() {
    const dispatch = useDispatch()
    const userReducer = useSelector((state) => state.userReducer);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(50);
    const tableBodyList = userReducer.data?.results || []
    const count = userReducer.data?.count || 0
    const loading = userReducer.loading || 0

    const [state, setState] = useState({
        tableBodyList: [],
        dialogInfo: {
            isOpened: false,
            text: "",
            type: "",
        },
    });

    const proClickHandler = (data) => {
        console.log(data);
        dispatch(updateUserStatus(data._id, { isPro: !data.isPro }))
    }

    function deleteFromTable(data) {
        dispatch(deleteUser(data._id))
    }

    const [tableHeaders, setTableHeaders] = useState([
        { id: "_id", label: "ID" },
        { id: "Name", label: "Name" },
        { id: "Role", label: "Role" },
        { id: "Email", label: "Email" },
        { id: "Phone", label: "Phone" },
        {
            id: "Image", label: "Image",
            component: (data, setData) =>
                <img className="w-16 h-auto rounded-full" src={`${process.env.REACT_APP_ATLAS_URL}/file/${data.Image && data?.Image}`} alt="image" />
        },
        {
            id: "Status", label: "Status", component: (data, setData) =>
                <span className="cursor-pointer hover:text-[color:var(--primary-color)]" onClick={() => proClickHandler(data)}> {data.isPro ? 'REMOVE FROM PRO' : 'MAKE PRO'}
                </span>
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

    useEffect(() => {
        dispatch(getUsers({
            page: page + 1,
            limit: limit,
        }))
    }, [limit, page]);

    console.log(tableBodyList);

    return (
        <div>
            <MainHeader type="Users" subtype="All Users" />
            <div className="relative content p-2">
                <AdminCard>
                    <div className="relative">
                        <BoxHeader title="Users List" />
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

export default ViewAllUsers;
