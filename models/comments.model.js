const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    _id: { type: String, required: false },
    Description: { type: String, required: true },
    user: { type: String, ref: 'user', field: "_id" },
    Time: { type: Date, default: Date.now },
    Likes: { type: Array, ref: 'likes', field: "_id" },
    replies: { type: Array, ref: 'replies', field: "_id" }
})

module.exports = mongoose.model('comments', commentSchema);