const mongoose = require('mongoose');

const autoIncrementModelID = require('./incrementId.model');


const userSchema = new mongoose.Schema({
    _id: { type: String, required: false },
    Name: { type: String, required: false },
    Email: { type: String, required: false },
    Phone: { type: String, required: false },
    Password: { type: String, required: false },
    Image: { type: String, required: true },
    Role: { type: String, required: true },
    isPro: { type: Boolean, default: false },
    token: { type: String, required: false },
})

// userSchema.pre('save', function (next) {
//     if (!this.isNew) {
//         next();
//         return;
//     }

//     autoIncrementModelID('user', this, next);
// });

const user = mongoose.model('users', userSchema);

module.exports = user;