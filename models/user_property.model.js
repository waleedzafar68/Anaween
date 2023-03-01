const mongoose = require('mongoose');

const userPropertySchema = new mongoose.Schema({
    _id: { type: String, required: false, min: 1 },
    Name: { type: String, required: false },
    Type: { type: String, required: false },
    Project_Developer: { type: String, field: "_id", ref: 'developer' },
    Property: { type: String, required: false },
    User: { type: String, required: false, field: "_id", ref: "user" },
    BoughtFor: { type: Number, required: false },
    MarketPrice: { type: Number, required: false },
    City: { type: String, required: false },
    Country: { type: String, required: false },
    Address: { type: String, required: false },
    Location: { type: String, field: "_id", ref: 'location' },
    Link: { type: String, required: false },
    Description: { type: String, required: false },
    Details: { type: String, required: false },
    Amenities: { type: Array, ref: "amenities", field: "_id" },
    Images: {
        type: Array,
        required: false
    },
})

// propertySchema.pre('save', function (next) {
//     if (!this.isNew) {
//         next();
//         return;
//     }

//     autoIncrementModelID('property', this, next);
// });

const userProperty = mongoose.model('userProperty', userPropertySchema);

module.exports = userProperty;