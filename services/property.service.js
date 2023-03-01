const properties = require("../models/property.model");
const upload = require("../middleware/upload");

module.exports = {
  search,
  getProperties,
  getPropertyByID,
  addProperty,
  updateProperty,
  deleteProperty,
  updatePropertyImages
}

async function getProperties() {
  return await properties.find().sort({ _id: -1 });
}

async function search(location, pDeveloper, type, price, installmentYears, deliveryDate, unitType, amenities) {
  console.log(location)
  // Unit_PropertyType
  let data = await properties.find([
    {
      $and: [
        { "Location": { $eq: location } },
        // { "Project_Developer": { $eq: pDeveloper } },
        { "Type": { $eq: type } },
        { "Unit_PropertyType.Price": { $eq: price } },
        { "Unit_PropertyType.InstallmentYears": { $eq: installmentYears } },
        { "Unit_PropertyType.Delivery": { $eq: deliveryDate } },
        { "Unit_PropertyType.UnitType": { $eq: unitType } },
        { "_Amenities._id": { $eq: amenities } }
      ],

    },
    {
      $lookup: {
        from: "amenities",
        localField: "Amenities",
        foreignField: "_id",
        as: "_Amenities"
      }
    },
    {
      $lookup: {
        from: "projectDevelopers",
        localField: "Project_Developer",
        foreignField: "_id",
        as: "_ProjectDeveloper"
      }
    },
    {
      $lookup: {
        from: "location",
        localField: "Location",
        foreignField: "_id",
        as: "_Location"
      }
    }]
  )
  return data
}

async function getPropertyByID(id) {
  return await properties.findById(id).aggregate([
    {
      $lookup: {
        from: "amenities",
        localField: "Amenities",
        foreignField: "_id",
        as: "_Amenities",
      },
    },
    {
      $lookup: {
        from: "projectDevelopers",
        localField: "Project_Developer",
        foreignField: "_id",
        as: "_ProjectDeveloper",
      },
    },
    {
      $lookup: {
        from: "location",
        localField: "Location",
        foreignField: "_id",
        as: "_Location",
      },
    },
  ]);
}

async function addProperty(body, files) {
  const Images = files ? files.map((image) => image.filename) : [];
  const property = await properties.find({}).sort({ _id: -1 }).limit(1);

  const {
    Name,
    Type,
    Description,
    DownPayment,
    InstallmentYears,
    Delivery,
    Address,
    Link,
    City,
    Country,
    Price,
    Project_Developer,
    Location,
    Property,
    UserId
  } = body;
  const id = property.length === 0 ? "00001" : ("00000" + String(parseInt(property[0]._id) + 1)).slice(-4);
  const amenityList = body.Amenities?.split(",");
  const unitPropertyList = JSON.parse(body.Unit_PropertyType);
  return await properties.create({
    _id: id,
    Images: Images,
    Amenities: amenityList,
    Name: Name,
    Type: Type,
    Description: Description,
    DownPayment: DownPayment,
    InstallmentYears: InstallmentYears,
    Delivery: Delivery,
    Address: Address,
    Project_Developer: Project_Developer,
    Unit_PropertyType: unitPropertyList,
    Location: Location,
    Link: Link,
    City: City,
    Country: Country,
    Property: Property,
    Price: Price,
    User: UserId,
  });
}

async function updateProperty(id, body, files) {
  console.log(body, "body");
  console.log(body.Images, "body");
  console.log(id, "id ");
  const Images = (typeof body?.Images !== 'undefined') ? body.Images.split(",") : [];
  console.log(Images)
  if (files) {
    files.map(image => {
      Images.push(image.filename)
    })
  }

  return await properties.findById(id).then((property) => {
    property.Name = body.Name
    property.Type = body.Type
    property.Amenities = body.Amenities?.split(",");
    property.Description = body.Description
    property.Address = body.Address
    property.City = body.City
    property.Link = body.Link
    property.State = body.State
    property.Country = body.Country
    property.Location = body.Location
    property.Project_Developer = body.Project_Developer
    property.Unit_PropertyType = JSON.parse(body.Unit_PropertyType);
    property.DownPayment = body.DownPayment
    property.Delivery = body.Delivery
    property.InstallmentYears = body.InstallmentYears
    property.Images = Images
    property.Price = body.Price
    property.Area = body.Area
    property.Bedrooms = body.Bedrooms
    property.Bathrooms = body.Bathrooms
    console.log("Property ", property)
    property.save()
  })
}



async function updatePropertyImages(id, body) {
  const Images = (body.Images && body.Images?.length > 0) ? body.Images : [];

  console.log(Images, body.Images)
  return await properties.findById(id).then((property) => {

    property.Images = Images
    property.save()
  })
}

async function deleteProperty(id) {
  return await properties.findByIdAndDelete(id);
}
