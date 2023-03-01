
const contacts = require('../models/contact.model');

module.exports = {
    getContacts,
    getContactByID,
    addContact,
    updateContact,
    deleteContact,
}

async function getContacts() {
    return await contacts.find().sort({ _id: -1 })
}

async function getContactByID(id) {
    return await contacts.findById(id)
}

async function addContact(body) {
    // const id = contacts.find().then((Contact) => {
    //     const id = Contact.length === 0 ? "0001" : ("0000" + String(parseInt(sources[sources.length - 1]._id) + 1)).slice(-4)
    //     return id
    // })
    // return await contacts.create({ id, body })
    const contact = await contacts.find({}).sort({ '_id': -1 }).limit(1)
    console.log("contact body ", contact, body)
    const id = contact.length === 0 ? "00001" : ("00000" + String(parseInt(contact[0]._id) + 1)).slice(-4);
    return await contacts.create({ _id: id, ...body })
}

async function updateContact(id, body) {
    return await (contacts.findById(id).then(contact => {

        contact.Name = body.Name
        contact.Message = body.Message
        contact.Date = body.Date
        contact.Time = body.Time
        contact.PreferedLocation = body.PreferedLocation
        contact.PhoneNumber = body.PhoneNumber

        contact.save()
    })
    )
}

async function deleteContact(id) {
    return await contacts.findByIdAndDelete(id)
}
