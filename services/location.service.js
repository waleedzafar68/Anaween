
const locations = require('../models/location.model')

module.exports = {
    getLocations,
    getLocationByID,
    addLocation,
    updateLocation,
    deleteLocation,
}

async function getLocations() {
    return await locations.find().sort({ _id: -1 })
}

async function getLocationByID(id) {
    return await locations.findById(id)
}

async function addLocation(body) {
    // const id = locations.find().then((location) => {
    //     const id = location.length === 0 ? "0001" : ("0000" + String(parseInt(sources[sources.length - 1]._id) + 1)).slice(-4)
    //     return id
    // })
    // return await locations.create({ id, body })
    const location = await locations.find({}).sort({ '_id': -1 }).limit(1)
    console.log(location)
    const id = location.length === 0 ? "00001" : ("00000" + String(parseInt(location[0]._id) + 1)).slice(-4);
    return await locations.create({ _id: id, ...body })
}

async function updateLocation(id, body) {
    return await (locations.findById(id).then(location => {

        location.Address = body.Address
        location.Location = body.Location

        location.save()
    })
    )
}

async function deleteLocation(id) {
    return await locations.findByIdAndDelete(id)
}
