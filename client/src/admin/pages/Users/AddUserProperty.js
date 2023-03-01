import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import http from "../../../utils/http";

import BoxHeader from "../../components/UI/BoxHeader";
import MainHeader from "../../components/Navigation/MainHeader";
import AdminCard from "../../components/UI/AdminCard";
import Input from "../../components/UI/Input";
import { useForm } from "../../hooks/form-hook";
import FormButton from "../../components/UI/FormButton";
import { addUserProperty, updateUserProperty } from "../../../redux/user-properties/action";
import { getLocations } from "../../../redux/locations/action";
import { getDevelopers } from "../../../redux/developers/action";
import { getAmenities } from "../../../redux/amenities/action";
import { getUsers } from "../../../redux/users/action";

function AddUserProperty(props) {
    const dispatch = useDispatch();
    const locationReducer = useSelector((state) => state.locationReducer);
    const developerReducer = useSelector((state) => state.developerReducer);
    const amenityReducer = useSelector((state) => state.amenityReducer);
    const userReducer = useSelector((state) => state.userReducer);
    const locationsData = locationReducer.data?.results || [];
    const projectDevelopersData = developerReducer.data?.results || []
    const amenitiesData = amenityReducer.data?.results || [];
    const usersData = userReducer.data?.results || [];
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [updatePropertyTitle, setUpdatePropertyTitle] = useState("");
    const [updatePropertyType, setUpdatePropertyType] = useState("");
    const [updateProjectDeveloper, setUpdateProjectDeveloper] = useState("");
    const [updateProperty, setUpdateProperty] = useState("");
    const [marketPrice, setMarketPrice] = useState("");
    const [boughtFor, setBoughtFor] = useState("");
    const [updateCity, setUpdateCity] = useState("");
    const [updateCountry, setUpdateCountry] = useState("");
    const [updateAddress, setUpdateAddress] = useState("");
    const [updateLocation, setUpdateLocation] = useState("");
    const [updateLocationLink, setUpdateLocationLink] = useState("");
    const [updateDescription, setUpdateDescription] = useState("");
    const [updateDetails, setUpdateDetails] = useState("");
    const [resetForm, setResetForm] = useState(false);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();

    // Data to be edited from viewAllProperties
    const updateData = location.state;
    const [editData, setEditData] = useState(updateData);

    useEffect(() => {
        dispatch(getAmenities());
        dispatch(getLocations());
        dispatch(getDevelopers());
        dispatch(getUsers());
    }, []);

    //Cheking if Update Property from viewAllProperties was clicked.
    useEffect(() => {
        console.log(updateData);
        if (updateData) {
            setUpdatePropertyTitle(updateData.Name);
            setUpdatePropertyType(updateData.Type);
            setUpdateProjectDeveloper(updateData.Project_Developer);
            const boughtPriceToString = updateData.BoughtFor.toString();
            const marketPriceToString = updateData.MarketPrice.toString();
            setMarketPrice(marketPriceToString);
            setBoughtFor(boughtPriceToString);
            setUpdateCity(updateData.City);
            setUpdateCountry(updateData.Country);
            setUpdateAddress(updateData.Address);
            setUpdateLocation(updateData.Location);
            setUpdateLocationLink(updateData.Link);
            setUpdateDescription(updateData.Description);
            setUpdateDetails(updateData.Details);
            setSelectedAmenities(updateData.Amenities);
            inputHandler("amenities", updateData.Amenities);
            console.log(updateData);
            setOldImages(updateData.Images);
        }
    }, [updateData]);

    const [formState, inputHandler] = useForm({
        propertyTitle: "",
        PropertyType: "Residential",
        ProjectDeveloper: "",
        price: "",
        BoughtFor: "",
        MarketPrice: "",
        Delivery: "",
        City: "",
        Country: "",
        Address: "",
        Location: "",
        Link: "",
        User: "",
        ImageSelected: "",
        description: "",
        amenities: [],
    });

    const handleCheck = (e) => {
        let updatedList = [...selectedAmenities];
        if (e.target.checked) {
            updatedList = [...selectedAmenities, e.target.value];
        } else {
            updatedList.splice(selectedAmenities.indexOf(e.target.value), 1);
        }
        setSelectedAmenities(updatedList);
        inputHandler("amenities", updatedList);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        // If unit type or location was not selected.
        if (!(formState.Location)) {
            toast.error("Please Select Location. ");
            return;
        }

        const mergedFormState = { ...formState };

        const formData = new FormData();

        if (images) {
            images.forEach((image) => {
                console.log(image);
                formData.append("SelectedImages", image[0]);
            });
        }
        formData.append("Name", mergedFormState.propertyTitle);
        formData.append("Images", oldImages.toString() || []);
        formData.append("Type", mergedFormState.PropertyType);
        formData.append("Description", mergedFormState.description);
        formData.append("Amenities", mergedFormState.amenities);
        formData.append("Project_Developer", mergedFormState.ProjectDeveloper);
        formData.append("Unit_PropertyType", JSON.stringify(mergedFormState.unitTypes));
        formData.append("Price", mergedFormState.price);
        formData.append("MarketPrice", mergedFormState.MarketPrice);
        formData.append("BoughtFor", mergedFormState.BoughtFor);
        formData.append("Delivery", mergedFormState.Delivery);
        formData.append("Property", mergedFormState.Property);
        formData.append("UserId", mergedFormState.User);
        formData.append("Location", mergedFormState.Location);
        formData.append("Link", mergedFormState.Link);
        formData.append("City", mergedFormState.City);
        formData.append("Country", mergedFormState.Country);
        formData.append("Address", mergedFormState.Address);

        if (updateData) {
            dispatch(updateUserProperty({
                id: updateData._id,
                data: formData
            }, {}))
        }
        else {
            dispatch(addUserProperty(formData, {}))
        }

        setResetForm(true);
        setEditData(false);
        setSelectedAmenities([]);
        setImages([]);

        // to reset the location.state
        navigate("/admin/addUserProperty", { replace: true });
    };

    const deleteDBImage = (image, index) => {

        http.delete(`${process.env.REACT_APP_ATLAS_URL}/file/${image}`)
            .then(() => {
                toast.success("Image deleted successfully")

                updateData.Images = updateData.Images.filter(x => x !== image)
                setOldImages(updateData.Images.filter(x => x !== image))
                // http.put(`${process.env.REACT_APP_ATLAS_URL}/updateProperty/` + updateData._id, updateData)
                //   .then(() => {
                //     toast.success("Property Updated")
                //   }).catch(err => console.log(err))
            })
    }

    return (
        <section className="w-full">
            <MainHeader type="Users" subtype="Add New User Property" />
            <div className="content p-2">
                <AdminCard>
                    <div className="box box-primary">
                        <BoxHeader title={`Add User Property`} />
                        <form onSubmit={onSubmitHandler}>
                            <div className="box-body bozero mx5p flex flex-col md:gap-6 px-4 sm:px-12 md:px-16 py-3 text-[0.7rem] text-[#212020]">
                                <input type="hidden" name="ci_csrf_token" value="" />
                                <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 md:gap-20 lg-gap:5 xl:gap-5">
                                    <Input
                                        id="propertyTitle"
                                        label={"Property Title"}
                                        name={"PropertyTitle"}
                                        placeholder="Property title"
                                        updateValue={updatePropertyTitle}
                                        setUpdateValue={setUpdatePropertyTitle}
                                        resetForm={resetForm}
                                        setResetForm={setResetForm}
                                        onInput={inputHandler}
                                        required
                                    />
                                    <Input
                                        element="select"
                                        items={["Residential", "Commercial", "Admin"]}
                                        id={"PropertyType"}
                                        label={"Property Type"}
                                        name={"PropertyType"}
                                        updateValue={updatePropertyType}
                                        setUpdateValue={setUpdatePropertyType}
                                        resetForm={resetForm}
                                        setResetForm={setResetForm}
                                        onInput={inputHandler}
                                        required
                                    />
                                    <Input
                                        element="select"
                                        items={projectDevelopersData}
                                        id={"ProjectDeveloper"}
                                        label={"Project Developer"}
                                        name={"ProjectDeveloper"}
                                        updateValue={updateProjectDeveloper}
                                        setUpdateValue={setUpdateProjectDeveloper}
                                        resetForm={resetForm}
                                        setResetForm={setResetForm}
                                        onInput={inputHandler}
                                        required
                                    />
                                    <Input
                                        element="select"
                                        items={["For Sale", "For Rent", "Re-sale"]}
                                        id={"Property"}
                                        label={"Property"}
                                        name={"Proeperty"}
                                        updateValue={updateProperty}
                                        setUpdateValue={setUpdateProperty}
                                        resetForm={resetForm}
                                        setResetForm={setResetForm}
                                        onInput={inputHandler}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-20 lg-gap:5 xl:gap-5">
                                    <Input
                                        element="select"
                                        items={usersData}
                                        id={"User"}
                                        label={"User"}
                                        name={"User"}
                                        updateValue={updateProjectDeveloper}
                                        setUpdateValue={setUpdateProjectDeveloper}
                                        resetForm={resetForm}
                                        setResetForm={setResetForm}
                                        onInput={inputHandler}
                                        required
                                    />
                                    {/* <Input
                                        inputType="number"
                                        id={"price"}
                                        label={"Price"}
                                        name={"price"}
                                        updateValue={updatePrice}
                                        setUpdateValue={setUpdatePrice}
                                        resetForm={resetForm}
                                        setResetForm={setResetForm}
                                        onInput={inputHandler}
                                        required
                                        placeholder="20000"
                                    /> */}
                                    <Input
                                        inputType="number"
                                        id={"BoughtFor"}
                                        label={"Bought For"}
                                        name={"BoughtFor"}
                                        updateValue={boughtFor}
                                        setUpdateValue={setBoughtFor}
                                        resetForm={resetForm}
                                        setResetForm={setResetForm}
                                        onInput={inputHandler}
                                        required
                                    />
                                    <Input
                                        inputType="number"
                                        id="MarketPrice"
                                        label={"Market Price"}
                                        name="MarketPrice"
                                        updateValue={marketPrice}
                                        setUpdateValue={setMarketPrice}
                                        resetForm={resetForm}
                                        setResetForm={setResetForm}
                                        required
                                        onInput={inputHandler}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-5 lg-gap:5 xl:gap-5">
                                    <Input
                                        label={"City"}
                                        id={"City"}
                                        name={"City"}
                                        updateValue={updateCity}
                                        setUpdateValue={setUpdateCity}
                                        resetForm={resetForm}
                                        setResetForm={setResetForm}
                                        onInput={inputHandler}
                                        required
                                    />
                                    <Input
                                        label={"Country"}
                                        id={"Country"}
                                        name={"Country"}
                                        updateValue={updateCountry}
                                        setUpdateValue={setUpdateCountry}
                                        resetForm={resetForm}
                                        setResetForm={setResetForm}
                                        onInput={inputHandler}
                                        required
                                    />
                                    <Input
                                        element="textarea"
                                        label={"Address"}
                                        id={"Address"}
                                        name={"Address"}
                                        updateValue={updateAddress}
                                        setUpdateValue={setUpdateAddress}
                                        resetForm={resetForm}
                                        setResetForm={setResetForm}
                                        onInput={inputHandler}
                                        required
                                    />
                                    <Input
                                        element="select"
                                        items={locationsData}
                                        id={"Location"}
                                        label={"Location"}
                                        name={"Location"}
                                        updateValue={updateLocation}
                                        setUpdateValue={setUpdateLocation}
                                        resetForm={resetForm}
                                        setResetForm={setResetForm}
                                        onInput={inputHandler}
                                        required
                                    />
                                    <Input
                                        type="url"
                                        items={["Select", "Cash", "Credit"]}
                                        id={"Link"}
                                        label={"Location Link"}
                                        name={"Link"}
                                        updateValue={updateLocationLink}
                                        setUpdateValue={setUpdateLocationLink}
                                        resetForm={resetForm}
                                        setResetForm={setResetForm}
                                        onInput={inputHandler}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap[0.18rem]">
                                    <label className="font-semibold">Image</label>
                                    <input
                                        id={"ImageSelected"}
                                        name="ImageSelected"
                                        type="file"
                                        accept=".png, .jpg, .jpeg"
                                        multiple
                                        onChange={(e) => {
                                            setImages((prevState) => [
                                                ...prevState,
                                                Object.values(e.target.files),
                                            ]);
                                            console.log(images);
                                        }}
                                        className="form-control border border-gray-300 bg-gray-50 rounded-l-sm"
                                    />
                                    {/* {typeof images !== 'undefined' && images.map((image, key) =>
                      <span key={key} index={key} className='databaseImgArea'>
                        <img alt="database images" style={{ margin: "5px 2px", objectFit: "cover" }} src={`${process.env.ATLAS_URI}/file/${image}`} width={60} height={60}></img>
                        <button type='button' onClick={this.openDialog}>x</button>
                      </span>
                    )} */}
                                    <div className="inline-flex">
                                        {updateData && updateData?.Images?.length > 0 && updateData?.Images.map((image, index) => (
                                            <div className="relative">
                                                <span className="text-red-500 absolute z-10 bg-gray-200 rounded-full px-1.5 py-0.25 cursor-pointer"
                                                    onClick={() => deleteDBImage(image, index)}>x</span>

                                                <img
                                                    alt="selected images"
                                                    className="w-20 h-20 m-1"
                                                    src={`${process.env.REACT_APP_ATLAS_URL}/file/${image}`}
                                                    width={60}
                                                    height={60}
                                                    key={index}
                                                ></img>
                                            </div>
                                        ))}
                                        {images.length > 0 &&
                                            images.map((image, index) => (
                                                <img
                                                    alt="selected images"
                                                    className="w-20 h-20 m-1"
                                                    src={URL.createObjectURL(image.length > 0 && image[0])}
                                                    width={60}
                                                    height={60}
                                                    key={index}
                                                ></img>
                                            ))}
                                        {/* {updateData &&
                      images.length > 0 &&
                      images.map((image, index) => (
                        <img
                          alt="selected images"
                          className="w-20 h-20 m-1"
                          src={`${process.env.REACT_APP_ATLAS_URL}/file/${image}`}
                          width={60}
                          height={60}
                          key={index}
                        ></img>
                      ))} */}
                                    </div>
                                </div>
                                <Input
                                    element="textarea"
                                    id="description"
                                    label={"Description"}
                                    name={"Description"}
                                    updateValue={updateDescription}
                                    setUpdateValue={setUpdateDescription}
                                    resetForm={resetForm}
                                    setResetForm={setResetForm}
                                    onInput={inputHandler}
                                />
                                <Input
                                    element="textarea"
                                    id="details"
                                    label={"Details"}
                                    name={"Detials"}
                                    updateValue={updateDescription}
                                    setUpdateValue={setUpdateDescription}
                                    resetForm={resetForm}
                                    setResetForm={setResetForm}
                                    onInput={inputHandler}
                                />

                                <div className="flex flex-col gap-2 ">
                                    <h3 className="font-semibold after:content-['*'] after:ml-0.5 after:text-red-500">
                                        Amenities
                                    </h3>

                                    {amenitiesData ? (
                                        amenitiesData.map((amenity) => (
                                            <div key={amenity._id} className="flex gap-2">
                                                <input
                                                    type="checkbox"
                                                    name={`${amenity.Name}`}
                                                    id={`${amenity._id}`}
                                                    value={amenity._id}
                                                    onChange={handleCheck}
                                                    checked={selectedAmenities.includes(amenity._id)}
                                                    className="w-[0.6rem]"
                                                />
                                                <label
                                                    htmlFor={`${amenity._id}`}
                                                    className="flex gap-1 font-semibold"
                                                >
                                                    <span>
                                                        {amenity.Name}{" "}
                                                        <span className="font-normal">
                                                            ({amenity.Description})
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                        ))
                                    ) : (
                                        <span>No Amenities to show</span>
                                    )}
                                </div>
                            </div>
                            <FormButton>{editData ? "Update" : "Save"}</FormButton>
                        </form>
                    </div>
                </AdminCard>
            </div>
        </section>
    );
}

export default AddUserProperty;
