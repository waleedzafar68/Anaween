const userProperties = require("../models/user_property.model");
const upload = require("../middleware/upload");

module.exports = {
    search,
    getUserProperties,
    getUserPropertyByID,
    addUserProperty,
    updateUserProperty,
    deleteUserProperty,
    updateUserPropertyImages
}

async function getUserProperties() {
    return await userProperties.find().sort({ _id: -1 });
}

async function search(location, pDeveloper, type, amenities) {
    console.log(location)
    // Unit_PropertyType
    let data = await userProperties.find([
        {
            $and: [
                { "Location": { $eq: location } },
                // { "Project_Developer": { $eq: pDeveloper } },
                { "Type": { $eq: type } },
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

async function getUserPropertyByID(id) {
    return await userProperties.findById(id).aggregate([
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

async function addUserProperty(body, files) {
    const Images = files ? files.map((image) => image.filename) : [];
    const property = await userProperties.find({}).sort({ _id: -1 }).limit(1);

    const {
        Name,
        Type,
        Project_Developer,
        Property,
        UserId,
        BoughtFor,
        MarketPrice,
        City,
        Country,
        Address,
        Location,
        Link,
        Description,
        Details,
    } = body;
    const id = property.length === 0 ? "00001" : ("00000" + String(parseInt(property[0]._id) + 1)).slice(-4);
    const amenityList = body.Amenities?.split(",");
    return await userProperties.create({
        _id: id,
        Name: Name,
        Type: Type,
        Project_Developer: Project_Developer,
        Property: Property,
        User: UserId,
        BoughtFor: BoughtFor,
        MarketPrice: MarketPrice,
        City: City,
        Country: Country,
        Address: Address,
        Location: Location,
        Link: Link,
        Description: Description,
        Details: Details,
        Amenities: amenityList,
        Images: Images,
    });
}

async function updateUserProperty(id, body, files) {
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

    return await userProperties.findById(id).then((property) => {
        property.Name = body.Name
        property.Type = body.Type
        property.Project_Developer = body.Project_Developer
        property.Property = body.Property
        property.User = body.UserId
        property.BoughtFor = body.BoughtFor
        property.MarketPrice = body.MarketPrice
        property.City = body.City
        property.Country = body.Country
        property.Address = body.Address
        property.Location = body.Location
        property.Link = body.Link
        property.Description = body.Description
        property.Details = body.Details
        property.Amenities = body.Amenities?.split(",");
        property.Images = Images
        console.log("Property ", property)
        property.save()
    })
}



async function updateUserPropertyImages(id, body) {
    const Images = (body.Images && body.Images?.length > 0) ? body.Images : [];

    console.log(Images, body.Images)
    return await userProperties.findById(id).then((property) => {

        property.Images = Images
        property.save()
    })
}

async function deleteUserProperty(id) {
    return await userProperties.findByIdAndDelete(id);
}
