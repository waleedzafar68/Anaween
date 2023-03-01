import React, { useState, useEffect, useContext } from 'react'
import { changeHandler } from '../../Helpers/ChangeHandler'
import * as $ from 'jquery'
import http from '../../../utils/http'
import BoxHeader from '../../components/BoxHeader'
import Dialog from '../../components/Dialog'
import { ATLAS_URI } from '../../Constants'
import stateContext from '../../context/StateContext'


function AddProjects() {

    const contextState = useContext(stateContext)
    let { EditDetailsData, configToken } = contextState.state
    const { redirectFromEditDetails, resetEditID } = contextState

    const [state, setState] = useState({
        resetNewRow: {
            Name: "",
            Location: "",
            Area: "",
            Description: "",
            Images: []
        },
        newTableRow: {
            Name: "",
            Location: "",
            Area: "",
            Description: "",
            Images: []
        },
        tableBodyList: [

        ],
        dialogInfo: {
            isOpened: false,
            text: "",
            type: ""
        },
        editingActivated: false,
        editingID: "",

    })

    useEffect(() => {

        if (!resetEditID("/Projects/addProjects")) {
            console.log("Entered ID")
            http.get(`${ATLAS_URI}/getProjectByID/${EditDetailsData.id}`, configToken).then(response => {
                const responseData = response.data;
                if (typeof responseData !== 'undefined') {
                    setState(prevState => ({
                        ...prevState,
                        newTableRow: responseData,
                        editingActivated: true
                    }))
                }
            }).catch(err => console.log(err))
        } else EditDetailsData = {}

    }, []);

    function addNewProject(e) {
        e.preventDefault();
        const formData = new FormData();

        if (state.newTableRow.ImageSelected) {
            state.newTableRow.ImageSelected.forEach(image => {
                formData.append('SelectedImages', image);
            })
        }

        formData.append('Name', state.newTableRow.Name);
        formData.append('Location', state.newTableRow.Location);
        formData.append('Area', state.newTableRow.Area);
        formData.append('Description', state.newTableRow.Description);
        formData.append('Images', state.newTableRow.Images);

        if (!state.editingActivated) {
            http.post(`${ATLAS_URI}/addProject/`, formData, configToken)
                .then(response => {
                    if (response.status === 200) {
                        const newDialogInfo = { isOpened: true, text: "Project Added Successfully", type: "Success" }
                        document.getElementsByName("ImageSelected")[0].value = "";
                        setState(prevState => ({ ...prevState, newTableRow: state.resetNewRow, dialogInfo: newDialogInfo }))
                        setTimeout(() => {
                            setState(prevState => ({ ...prevState, dialogInfo: { isOpened: false, text: "", type: "" } }))
                        }, 3000)

                    }
                })
                .catch(err => alert(err))

        } else {
            if (state.newTableRow.ImageSelected) {
                http.post(`${ATLAS_URI}/updateProjectWithImages/` + EditDetailsData.id, formData, configToken)
                    .then(() => {
                        redirectFromEditDetails(EditDetailsData.redirectFrom)
                    }).catch(err => alert(err))

            } else {
                http.post(`${ATLAS_URI}/updateProject/` + EditDetailsData.id, state.newTableRow, configToken)
                    .then(() => {
                        redirectFromEditDetails(EditDetailsData.redirectFrom)
                    }).catch(err => alert(err))

            }

        }

    }

    function openDialog(e) {
        const newDialogInfo = {
            isOpened: true,
            delSrc: $(e.target.parentElement).find("img").attr("src"),
            delIndex: $(e.target.parentElement).attr("index"),
            text: "Are you sure you want to delete this Image?",
            type: "Confirm"
        }
        setState(prevState => ({ ...prevState, dialogInfo: newDialogInfo }))
        setTimeout(() => { setState(prevState => ({ ...prevState, dialogInfo: { isOpened: false, text: "", type: "" } })) }, 3000)
    }


    return (
        <section className="content">
            <div className="row">
                {state.dialogInfo.isOpened && <Dialog
                    onFalse={(e) => setState(prevState => ({ ...prevState, dialogInfo: { isOpened: false, text: "" } }))}
                    onTrue={(e) => { }}
                    dialogInfo={state.dialogInfo}
                />}
                <div className="col-md-12">

                    <div className="box box-primary">
                        <BoxHeader title={`${state.editingActivated ? "Edit" : "Add"} Project`} />

                        <form onSubmit={addNewProject}>
                            <div className="box-body bozero mx5p">

                                <input type="hidden" name="ci_csrf_token" value="" />

                                <div className="row">

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Project Name</label> <small className="req"> *</small>
                                            <input name="Name" type="text" className="form-control" required value={state.newTableRow.Name} onChange={(e) => changeHandler(e, state, setState)} />
                                        </div>
                                    </div>

                                </div>


                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Project Location</label> <small className="req"> *</small>
                                            <input name="Location" type="text" className="form-control" required value={state.newTableRow.Location} onChange={(e) => changeHandler(e, state, setState)} />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Project Area (acre)</label> <small className="req"> *</small>
                                            <input name="Area" type="text" className="form-control" required value={state.newTableRow.Area} onChange={(e) => changeHandler(e, state, setState)} />
                                        </div>
                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Project Description</label>
                                            <textarea name="Description" type="text" className="form-control" value={state.newTableRow.Description} onChange={(e) => changeHandler(e, state, setState)} rows="3"></textarea>
                                        </div>
                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Image</label>
                                            <input name="ImageSelected" type="file" accept=".png, .jpg, .jpeg" multiple className='form-control' onChange={(e) => changeHandler(e, state, setState)} />

                                            {typeof state.newTableRow.Images !== 'undefined' && state.newTableRow.Images.map((image, key) =>
                                                <span key={key} index={key} className='databaseImgArea'>
                                                    <img alt="database images" style={{ margin: "5px 2px", objectFit: "cover" }} src={`${ATLAS_URI}/file/${image}`} width={60} height={60}></img>
                                                </span>
                                            )}

                                            {typeof state.newTableRow.ImageSelected !== 'undefined' && state.newTableRow.ImageSelected.map((image, key) =>
                                                <img key={key} alt="selected images" style={{ margin: "5px 2px", objectFit: "cover" }} src={URL.createObjectURL(image)} width={60} height={60}></img>
                                            )}

                                        </div>
                                    </div>

                                </div>

                            </div>


                            <div className="box-footer">
                                <button type="submit" className="btn btn-info pull-right">Save</button>
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </section>
    )


}

export default AddProjects