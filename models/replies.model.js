const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    _id: { type: String, required: false },
    Description: { type: String, required: true },
    user: { type: String, ref: 'user', field: '_id' },
    parentComment: { type: String, ref: 'comment', field: "_id" },
    Date: { type: Date, default: Date.now }
});

const reply = mongoose.model('replies', replySchema);

module.exports = reply;