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
import UnitTypeForm from "./UnitTypeForm";
import { addProperty, updateProperty } from "../../../redux/properties/action";
import { getLocations } from "../../../redux/locations/action";
import { getDevelopers } from "../../../redux/developers/action";
import { getAmenities } from "../../../redux/amenities/action";

function AddProperty(props) {
  const dispatch = useDispatch();
  const locationReducer = useSelector((state) => state.locationReducer);
  const developerReducer = useSelector((state) => state.developerReducer);
  const unitTypeReducer = useSelector((state) => state.unitTypeReducer);
  const amenityReducer = useSelector((state) => state.amenityReducer);
  const locationsData = locationReducer.data?.results || [];
  const projectDevelopersData = developerReducer.data?.results || []
  const [unitTypes, setUnitTypes] = useState(unitTypeReducer.data?.results || [{}]);
  const amenitiesData = amenityReducer.data?.results || [];

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [updatePropertyTitle, setUpdatePropertyTitle] = useState("");
  const [updatePropertyType, setUpdatePropertyType] = useState("");
  const [updateProjectDeveloper, setUpdateProjectDeveloper] = useState("");
  const [updateProperty, setUpdateProperty] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");
  const [yearsOnInstallment, setYearsOnInstallment] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [updateCity, setUpdateCity] = useState("");
  const [updateCountry, setUpdateCountry] = useState("");
  const [updateAddress, setUpdateAddress] = useState("");
  const [updateLocation, setUpdateLocation] = useState("");
  const [updateLocationLink, setUpdateLocationLink] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
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
  }, []);

  //Cheking if Update Property from viewAllProperties was clicked.
  useEffect(() => {
    console.log(updateData);
    if (updateData) {
      setUpdatePropertyTitle(updateData.Name);
      setUpdatePropertyType(updateData.Type);
      setUpdateProjectDeveloper(updateData.Project_Developer);
      setUpdatePrice(updateData.Price);
      const yearsToString = updateData.InstallmentYears.toString();
      setYearsOnInstallment(yearsToString);
      const paymentToString = updateData.DownPayment.toString();
      setDownPayment(paymentToString);
      setDeliveryDate(updateData.Delivery);
      setUpdateCity(updateData.City);
      setUpdateCountry(updateData.Country);
      setUpdateAddress(updateData.Address);
      setUpdateLocation(updateData.Location);
      setUpdateLocationLink(updateData.Link);
      setUpdateDescription(updateData.Description);
      setSelectedAmenities(updateData.Amenities);
      inputHandler("amenities", updateData.Amenities);
      console.log(updateData);
      setUnitTypes(updateData.Unit_PropertyType);
      setOldImages(updateData.Images);
    }
  }, [updateData]);

  const [formState, inputHandler] = useForm({
    propertyTitle: "",
    PropertyType: "Residential",
    ProjectDeveloper: "",
    price: "",
    InstallmentYears: "",
    DownPayment: "",
    Delivery: "",
    City: "",
    Country: "",
    Address: "",
    Location: "",
    Link: "",
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

    const mergedFormState = { ...formState, unitTypes };

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
    formData.append("DownPayment", mergedFormState.DownPayment);
    formData.append("InstallmentYears", mergedFormState.InstallmentYears);
    formData.append("Delivery", mergedFormState.Delivery);
    formData.append("Property", mergedFormState.Property);
    formData.append("Location", mergedFormState.Location);
    formData.append("Link", mergedFormState.Link);
    formData.append("City", mergedFormState.City);
    formData.append("Country", mergedFormState.Country);
    formData.append("Address", mergedFormState.Address);

    if (updateData) {
      dispatch(updateProperty({
        id: updateData._id,
        data: formData
      }, {}))
    }
    else {
      dispatch(addProperty(formData, {}))
    }

    setResetForm(true);
    setEditData(false);
    setSelectedAmenities([]);
    setUnitTypes([
      {
        UnitType: "",
        UnitName: "",
        AreaFrom: "",
        AreaTo: "",
        Price: "",
      },
    ]);
    setImages([]);
    // to reset the location.state
    navigate("/admin/addProperty", { replace: true });
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
      <MainHeader type="Properties" subtype="Add New Property" />
      <div className="content p-2">
        <AdminCard>
          <div className="box box-primary">
            <BoxHeader title={`Add Property`} />
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
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      inputType="number"
                      id={"InstallmentYears"}
                      label={"Years On Installment"}
                      name={"InstallmentYears"}
                      updateValue={yearsOnInstallment}
                      setUpdateValue={setYearsOnInstallment}
                      resetForm={resetForm}
                      setResetForm={setResetForm}
                      onInput={inputHandler}
                      required
                    />
                    <Input
                      inputType="number"
                      id="DownPayment"
                      label={"Down Payment"}
                      name="DownPayment"
                      updateValue={downPayment}
                      setUpdateValue={setDownPayment}
                      resetForm={resetForm}
                      setResetForm={setResetForm}
                      required
                      onInput={inputHandler}
                    />
                  </div>
                  <Input
                    inputType="number"
                    id="Delivery"
                    label={"Delivery Date"}
                    name="Delivery"
                    updateValue={deliveryDate}
                    setUpdateValue={setDeliveryDate}
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
                          src={URL.createObjectURL(image[0])}
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
              <FormButton
                type="button"
                onClick={() =>
                  setUnitTypes((prevState) => [
                    ...prevState,
                    {
                      UnitType: "",
                      UnitName: "",
                      AreaFrom: "",
                      AreaTo: "",
                      Price: "",
                    },
                  ])
                }
              >
                <i className="fa-regular fa-plus flex items-center justify-center text-3xl h-5 w-5"></i>
              </FormButton>
              <div className="flex items-end gap-4  px-1 sm:px-4 md:px-10 lg:px-16 my-4">
                <div className="flex flex-col gap-4 w-full">
                  {unitTypes && unitTypes?.map((form, index) => (
                    <UnitTypeForm
                      removeUnitFormHandler={(e) => {
                        setUnitTypes(unitTypes.filter((v, i) => i !== index));
                      }}
                      unitType={form}
                      key={index}
                      index={index}
                    />
                  ))}
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

export default AddProperty;
