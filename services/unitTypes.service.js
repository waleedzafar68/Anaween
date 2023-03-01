
const unitTypes = require('../models/unitTypes.model')

module.exports = {
    getUnitTypes,
    getUnitTypeByID,
    addUnitType,
    updateUnitType,
    deleteUnitType,
}

async function getUnitTypes() {
    return await unitTypes.find().sort({ _id: -1 })
}

async function getUnitTypeByID(id) {
    return await unitTypes.findById(id)
}

async function addUnitType(body) {
    // const id = unitTypes.find().then((unitType) => {
    //     const id = unitType.length === 0 ? "0001" : ("0000" + String(parseInt(sources[sources.length - 1]._id) + 1)).slice(-4)
    //     return id
    // })
    // return await unitTypes.create({ id, body })
    console.log(body)

    const unitType = await unitTypes.find({}).sort({ '_id': -1 }).limit(1)
    console.log(unitType)
    const id = unitType.length === 0 ? "00001" : ("00000" + String(parseInt(unitType[0]._id) + 1)).slice(-4);
    return await unitTypes.create({ _id: id, ...body })
}

async function updateUnitType(id, body) {
    return await (unitTypes.findById(id).then(unitType => {

        unitType.Name = body.Name

        unitType.save()
    })
    )
}

async function deleteUnitType(id) {
    return await unitTypes.findByIdAndDelete(id)
}
