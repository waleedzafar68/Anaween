// const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const autoIncrementModelID = require('./incrementId.model');

const developerSchema = new mongoose.Schema({
    _id: { type: String, required: false },
    Name: { type: String, required: false },
    Description: { type: String, required: false },
    Icon: {
        type: Array, required: false
    }
});

// projectDeveloperSchema.pre('save', function (next) {
//     if (!this.isNew) {
//         next();
//         return;
//     }

//     autoIncrementModelID('projectDevelopers', this, next);
// });

const developer = mongoose.model("developers", developerSchema)

module.exports = developer