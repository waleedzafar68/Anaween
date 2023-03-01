// const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const autoIncrementModelID = require('./incrementId.model');

const unit_TypesSchema = new mongoose.Schema({
    _id: { type: String, required: false },
    Name: { type: String, required: false },
});

// unit_TypesSchema.pre('save', function (next) {
//     if (!this.isNew) {
//         next();
//         return;
//     }

//     autoIncrementModelID('unitType', this, next);
// });

const unit_Type = mongoose.model('unitType', unit_TypesSchema);

module.exports = unit_Type;