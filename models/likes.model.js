const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    _id: { type: String, required: false },
    user: { type: String, ref: 'user', field: "_id" },
    comment: { type: String, ref: 'comment', field: "_id" },
    date: { type: Date, default: Date.now }
});

const like = mongoose.model('likes', likeSchema);

module.exports = like; 