const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    _id: { type: String, required: true, },
    author: { type: String, ref: 'user', field: '_id' },
    type: { type: String, enum: ['like', 'reply'], required: true, },
    comment: { type: String, ref: 'comment', required: true, },
    reply: { type: String, ref: 'reply', field: '_id' },
    user: { type: String, ref: 'user', required: true, },
    status: { type: String, enum: ['read', 'unread'], default: 'unread', },
    Date: { type: Date, default: Date.now, },
});

const notification = mongoose.model('notifications', notificationSchema);

module.exports = notification;