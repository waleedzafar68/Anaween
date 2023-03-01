import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import BoxHeader from "../../components/UI/BoxHeader";
import Dialog from "../../components/UI/Dialog";
import AdminCard from "../../components/UI/AdminCard";
import MainHeader from "../../components/Navigation/MainHeader";
import Input from "../../components/UI/Input";
import FormButton from "../../components/UI/FormButton";
import DataTable from "../../components/UI/DataTable";
import Paginator from "../../components/UI/paginator";
import { useForm } from "../../hooks/form-hook";
import { addBlog, deleteBlog, getBlogs, updateBlog } from "../../../redux/blogs/action";

function AddBlogs() {
    const dispatch = useDispatch()
    const quill = useRef();
    const blogReducer = useSelector((state) => state.blogReducer);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(50);
    const tableBodyList = blogReducer.data?.results || []
    const count = blogReducer.data?.count || 0
    const loading = blogReducer.loading || 0
    const [edit, setEdit] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const [updateTitle, setUpdateTitle] = useState("");
    const [description, setDescription] = useState("");
    const [updateImage, setUpdateImage] = useState("");
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState();
    const [updateData, setUpdateData] = useState(null);

    const [formState, inputHandler] = useForm({
        Title: "",
        Description: "",
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
        dispatch(deleteBlog(data._id));
        setImage(null);
    }

    const editHandler = (data) => {
        setUpdateData(data);
        setUpdateTitle(data.Title);
        setDescription(data.Description);
        setUpdateImage(data.Image);
        setEdit(true);
    };

    const editCancelHandler = () => {
        if (edit) setEdit(false);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("Title", formState.Title);
        formData.append("Image", image);
        formData.append("Description", formState.Description);

        updateData
            ?
            dispatch(updateBlog({
                id: updateData._id,
                data: formData
            }, {}))
            :
            dispatch(addBlog(formData, {}))

        setResetForm(true);
        setImage(null);
        setUpdateImage(null);
        setUpdateData(null);
        setDescription('');
        setEdit(false);
    };

    useEffect(() => {
        dispatch(getBlogs({
            page: page + 1,
            limit: limit,
        }));
    }, [limit, page]);

    const descriptionChangeHandler = (desc) => {
        inputHandler('Description', desc)
        setDescription(desc);
    }

    const [tableHeaders, setTableHeaders] = useState([
        { id: "_id", label: "ID" },
        { id: "Title", label: "Title" },
        {
            id: "Image", label: "Image",
            component: (data, setData) => (
                <img className="w-20 h-auto" src={`${process.env.REACT_APP_ATLAS_URL}/file/${data.Image && data.Image}`} alt="blog" />
            )
        },
        {
            id: "Description", label: "Description", component: (data, setData) => (
                <p dangerouslySetInnerHTML={{ __html: data.Description }}></p>
            )
        },
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

    useEffect(() => {
        if (!image || updateImage) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(image);
    }, [image]);

    return (
        <section className="content">
            <MainHeader type="Masters" subtype="Add Blog" />
            <div className="grid grid-cols-1 md:grid-cols-[2fr,3fr] gap-3 md:gap-5 w-full p-2">
                <AdminCard className="h-fit">
                    <BoxHeader title={`${updateData ? "Update" : "Add"} Blog`} />
                    <form
                        onSubmit={onSubmitHandler}
                        className="flex flex-col gap-4 pt-2 px-2"
                    >
                        <Input
                            label={"Title"}
                            id="Title"
                            name={"BlogTitle"}
                            updateValue={updateTitle}
                            setUpdateValue={setUpdateTitle}
                            resetForm={resetForm}
                            setResetForm={setResetForm}
                            onInput={inputHandler}
                            required
                        />
                        <ReactQuill theme="snow" value={description} onChange={descriptionChangeHandler} className="!h-40" />
                        <div className="flex flex-col gap[0.18rem] mt-12">
                            <label className="font-semibold mb-1">Image</label>
                            <input
                                id={"ImageSelected"}
                                name="ImageSelected"
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                onChange={(e) => {
                                    setImage(e.target.files[0]); { setUpdateImage(null) }
                                }}
                                className="form-control border border-gray-300 bg-gray-50 rounded-l-sm cursor-pointer text-sm leading-5"
                            />
                            <div className="inline-flex">
                                {updateImage && (<div className="relative">
                                    <img
                                        alt="selected image"
                                        className="w-20 h-20 m-1"
                                        src={`${process.env.REACT_APP_ATLAS_URL}/file/${updateImage}`}
                                        width={60}
                                        height={60}
                                    ></img>
                                </div>)}
                                {image && !updateImage &&
                                    <img
                                        alt="selected image"
                                        className="w-20 h-20 m-1"
                                        src={previewUrl}
                                        width={60}
                                        height={60}
                                    ></img>
                                }
                            </div>
                        </div>
                        <FormButton onClick={editCancelHandler}>
                            {updateData ? "Update" : "Save"}
                        </FormButton>
                    </form>
                </AdminCard>

                <AdminCard className="relative">
                    <div className="box box-primary">
                        <BoxHeader title="Added Blogs" />
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
                            <div className="box box-primary">
                                <div className="h-fit rounded-lg bg-white mb-6 shadow-md">
                                    <div>
                                        <DataTable
                                            isLoading={loading}
                                            tableHeadersData={tableHeaders}
                                            setTableHeadersData={setTableHeaders}
                                            tableBodyData={tableBodyList || []}
                                        />
                                    </div>
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
                    </div>
                </AdminCard>
            </div>
        </section>
    );
}

export default AddBlogs;
