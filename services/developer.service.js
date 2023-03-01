const developers = require('../models/developer.model')
const upload = require('../middleware/upload')

module.exports = {
    getProjectDevelopers,
    getProjectDeveloperByID,
    addProjectDeveloper,
    updateProjectDeveloper,
    deleteProjectDeveloper,
}

async function getProjectDevelopers() {
    return await developers.find().sort({ _id: -1 })
}

async function getProjectDeveloperByID(id) {
    return await developers.findById(id)
}

async function addProjectDeveloper(body, files) {
    console.log(files);
    const Images = files ? files.map(image => image.filename) : [];
    // const id = developers.find().then((projectdeveloper) => {
    //     const id = projectdeveloper.length === 0 ? "0001" : ("0000" + String(parseInt(sources[sources.length - 1]._id) + 1)).slice(-4)
    //     return id
    // })
    // return await developers.create({ id, body })
    const projectDeveloper = await developers.find({}).sort({ '_id': -1 }).limit(1)
    console.log(projectDeveloper)
    const id = projectDeveloper.length === 0 ? "00001" : ("00000" + String(parseInt(projectDeveloper[0]._id) + 1)).slice(-4);
    return await developers.create({ _id: id, Icon: Images, ...body })
}

async function updateProjectDeveloper(id, body) {
    return await (developers.findById(id).then(projectDeveloper => {

        projectDeveloper.Name = body.Name
        projectDeveloper.Description = body.Description
        projectDeveloper.Icon = typeof body.Icon === 'string' ? body.Icon.split(",") : body.Icon

        projectDeveloper.save()
    })
    )
}

async function deleteProjectDeveloper(id) {
    return await developers.findByIdAndDelete(id)
}
