import React, { useState, useEffect, useContext } from 'react'
import http from '../../../utils/http'

import BoxHeader from '../../components/BoxHeader'
import DataTable from '../../components/DataTable'
import Dialog from '../../components/Dialog'
import { ATLAS_URI } from '../../Constants'
import stateContext from '../../context/StateContext'

function ViewAllProjects(props) {

    const contextState = useContext(stateContext)
    const updateEditDetails = contextState.updateEditDetails
    const { configToken } = contextState.state

    const [state, setState] = useState({
        tableBodyList: [],
        dialogInfo: {
            isOpened: false,
            text: "",
            type: ""
        }
    })

    const mounted = React.useRef(true);
    useEffect(() => () => { mounted.current = false; }, []);
    useEffect(() => {
        //Get All Agents
        http.get(`${ATLAS_URI}/getProjects/`, configToken)
            .then(response => {
                const projectsData = response.data;
                if (mounted.current) setState(prevState => ({ ...prevState, tableBodyList: projectsData }))
            }).catch(err => console.log(err))

    }, [])


    function editRecord(e) {
        const temp = e.target.parentElement.parentElement.id;
        updateEditDetails({ id: temp, editingActivated: true, redirectTo: "/Projects/addProjects", redirectFrom: "/Projects/viewAllProjects" });
    }

    function openDialog(e) {
        const newDialogInfo = {
            isOpened: true,
            delID: e.target.parentElement.parentElement.id,
            text: "Are you sure you want to delete this Project?",
            type: "Confirm"
        }
        setState(prevState => ({ ...prevState, dialogInfo: newDialogInfo }))
    }

    function deleteFromTable(e) {
        const delID = state.dialogInfo.delID;
        http.delete(`${ATLAS_URI}/deleteProject/` + delID, configToken)
            .then(() => {
                state.tableBodyList.filter(data => data.id.toString() === delID)[0].Images.forEach((image) => {
                    http.delete(`${ATLAS_URI}/file/${image}`, configToken);
                })
                const newTableBodyList = state.tableBodyList.filter(data => data.id.toString() !== delID);
                setState(prevState => ({
                    ...prevState,
                    tableBodyList: newTableBodyList,
                    dialogInfo: { isOpened: false, text: "", delID: "" }
                }))
            })
            .catch(err => alert(err))

    }


    return (
        <div className="content">
            <div className="row">
                {state.dialogInfo.isOpened && <Dialog
                    onFalse={(e) => setState(prevState => ({ ...prevState, dialogInfo: { isOpened: false, text: "" } }))}
                    onTrue={(e) => deleteFromTable(e)}
                    dialogInfo={state.dialogInfo}
                />}
                <div className="col-md-12">

                    <div className="box box-primary">

                        <BoxHeader title="Projects List" />

                        <div className="box-body">

                            <DataTable
                                tableHeader={["id", "Name", "Location", "Properties"]}
                                tableBody={state.tableBodyList}
                                searchField="Name"
                                customAction={[
                                    { title: "Update", icon: "fas fa-edit", redirectTo: "/Projects/addProjects", onClickEvent: editRecord },
                                    { title: "Delete", icon: "fas fa-times text-red", onClickEvent: openDialog }
                                ]}
                            />

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )


}

export default ViewAllProjects