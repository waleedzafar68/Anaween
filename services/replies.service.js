const comments = require('../models/comments.model');
const notifications = require('../models/notifications.model');
const replies = require('../models/replies.model');

module.exports = {
    getReplies,
    getReplyByID,
    addReply,
    updateReply,
    deleteReply,
}

async function getReplies() {
    return await replies.find().sort({ _id: -1 })
}

async function getReplyByID(id) {
    return await replies.findById(id)
}

async function addReply(commentId, body) {
    const reply = await replies.find({}).sort({ '_id': -1 }).limit(1)
    const comment = await comments.findById(commentId);

    const id = reply.length === 0 ? "00001" : ("00000" + String(parseInt(reply[0]._id) + 1)).slice(-4);

    // Adding a new notification
    const notification = await notifications.find({}).sort({ '_id': -1 }).limit(1)
    const notificationId = notification.length === 0 ? "00001" : ("00000" + String(parseInt(notification[0]._id) + 1)).slice(-4);

    return await replies.create({ _id: id, Description: body.Description, user: body.user, parentComment: commentId }).then(reply => {
        notifications.create({ _id: notificationId, author: body.user, type: 'reply', comment: commentId, user: comment.user, status: 'unread', reply: reply._id })
        comments.findById(commentId).then(comment => {
            comment.replies.push(reply);
            comment.save();
        })
    })
}

async function updateReply(id, body) {
    return await (replies.findById(id).then(reply => {
        reply.Time = body.Time
        reply.Description = body.Description
        reply.save();
    })
    )
}

async function deleteReply(id) {
    return await replies.findByIdAndDelete(id);
}