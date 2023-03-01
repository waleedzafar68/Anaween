// const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const autoIncrementModelID = require('./incrementId.model');

const locationSchema = new mongoose.Schema({
    _id: { type: String, required: false },
    Location: { type: String, required: false },
    Address: { City: { type: String }, state: { type: String }, Country: { type: String }, Address: { type: String } }
})

// locationSchema.pre('save', function (next) {
//     if (!this.isNew) {
//         next();
//         return;
//     }

//     autoIncrementModelID('location', this, next);
// });

const location = mongoose.model('location', locationSchema);

module.exports = location;