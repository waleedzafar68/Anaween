// const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const autoIncrementModelID = require('./incrementId.model');

const propertySchema = new mongoose.Schema({
    _id: { type: String, required: false, min: 1 },
    Images: {
        type: Array,
        required: false
    },
    Amenities: { type: Array, ref: "amenities", field: "_id" },
    Name: { type: String, required: false },
    Type: { type: String, required: false },
    Description: { type: String, required: false },
    DownPayment: { type: Number, required: false },
    InstallmentYears: { type: Number, required: false },
    Delivery: { type: String, required: false },
    Address: { type: String, required: false },
    Project_Developer: { type: String, field: "_id", ref: 'developer' },
    Unit_PropertyType: { type: Array },
    Location: { type: String, field: "_id", ref: 'location' },
    Link: { type: String, required: false },
    City: { type: String, required: false },
    Country: { type: String, required: false },
    Property: { type: String, required: false },
    Price: { type: Number, required: false },
    User: { type: mongoose.Types.ObjectId, required: false, ref: "user" },
})

// propertySchema.pre('save', function (next) {
//     if (!this.isNew) {
//         next();
//         return;
//     }

//     autoIncrementModelID('property', this, next);
// });

const property = mongoose.model('property', propertySchema);

module.exports = property;