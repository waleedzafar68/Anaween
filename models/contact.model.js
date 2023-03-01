const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({
    _id: { type: String, required: false },
    Name: { type: String, required: false },
    Message: { type: String, required: false },
    PhoneNumber: { type: Number, required: false },
    PropertyName: { type: String, required: false },
    PreferedLocation: { type: String, required: false },
    Date: { type: Date, required: false },
    Time: { type: String, required: false }
})

const contacts = mongoose.model("contacts", contactsSchema);

module.exports = contacts;
