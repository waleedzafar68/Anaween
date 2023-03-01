const appraisals = require('../models/appraisals.model');

module.exports = {
    getAppraisals,
    getAppraisalByID,
    addAppraisal,
    updateAppraisal,
    deleteAppraisal,
}

async function getAppraisals() {
    return await appraisals.find().sort({ _id: -1 })
}

async function getAppraisalByID(id) {
    return await appraisals.findById(id)
}

async function addAppraisal(body) {
    const appraisal = await appraisals.find({}).sort({ '_id': -1 }).limit(1)
    const id = appraisal.length === 0 ? "00001" : ("00000" + String(parseInt(appraisal[0]._id) + 1)).slice(-4);
    return await appraisals.create({ _id: id, Name: body.Name, Project_Developer: body.ProjectDeveloper, AreaSize: body.AreaSize, Location: body.Location, BoughtFor: body.BoughtFor, Type: body.AppraisalType, Property: body.Property, Description: body.Description, UserName: body.UserName, Email: body.Email, Phone: body.Phone })

}

async function updateAppraisal(id, body, file) {

    return await (appraisals.findById(id).then(appraisal => {

        appraisal.Name = body.Name
        appraisal.Project_Developer = body.ProjectDeveloper
        appraisal.AreaSize = body.AreaSize
        appraisal.Location = body.Location
        appraisal.BoughtFor = body.BoughtFor
        appraisal.Type = body.PropertyType
        appraisal.Property = body.Property
        appraisal.Email = body.Email
        appraisal.Phone = body.Phone
        appraisal.UserName = body.UserName
        appraisal.Description = body.Description

        appraisal.save();
    })
    )
}

async function deleteAppraisal(id) {
    return await appraisals.findByIdAndDelete(id);
}