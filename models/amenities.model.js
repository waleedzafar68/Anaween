// const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const autoIncrementModelID = require('./incrementId.model');

const amenitiesSchema = new mongoose.Schema({
    _id: { type: String, required: false },
    Name: { type: String, required: false },
    Description: { type: String, required: false },
})

// amenitiesSchema.pre('save', function (next) {
//     if (!this.isNew) {
//         next();
//         return;
//     }

//     autoIncrementModelID('amenities', this, next);
// });

const amenity = mongoose.model('amenities', amenitiesSchema);

module.exports = amenity;