
const amenities = require('../models/amenities.model');

module.exports = {
    getAmenities,
    getAmenityByID,
    addAmenity,
    updateAmenity,
    deleteAmenity,
}

async function getAmenities() {
    return await amenities.find().sort({ _id: -1 })
}

async function getAmenityByID(id) {
    return await amenities.findById(id)
}

async function addAmenity(body) {
    // const id = amenities.find().then((amenity) => {
    //     const id = amenity.length === 0 ? "0001" : ("0000" + String(parseInt(sources[sources.length - 1]._id) + 1)).slice(-4)
    //     return id
    // })
    // return await amenities.create({ id, body })
    const amenity = await amenities.find({}).sort({ '_id': -1 }).limit(1)
    console.log(amenity)
    const id = amenity.length === 0 ? "00001" : ("00000" + String(parseInt(amenity[0]._id) + 1)).slice(-4);
    return await amenities.create({ _id: id, ...body })
}

async function updateAmenity(id, body) {
    return await (amenities.findById(id).then(amenity => {

        amenity.Name = body.Name
        amenity.Description = body.Description

        amenity.save()
    })
    )
}

async function deleteAmenity(id) {
    return await amenities.findByIdAndDelete(id)
}
