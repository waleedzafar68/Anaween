const comments = require('../models/comments.model');
const notifications = require('../models/notifications.model');
// const webpush = require('web-push');
const likes = require('../models/likes.model')

module.exports = {
    getComments,
    getCommentByID,
    addComment,
    updateComment,
    deleteComment,
    likeComment,
}

async function getComments() {
    return await comments.find().sort({ _id: -1 })
}

async function getCommentByID(id) {
    return await comments.findById(id)
}

async function addComment(body) {
    const comment = await comments.find({}).sort({ '_id': -1 }).limit(1)
    const id = comment.length === 0 ? "00001" : ("00000" + String(parseInt(comment[0]._id) + 1)).slice(-4);
    return await comments.create({ _id: id, Time: body.Time, Description: body.Description, user: body.UserId, })
    // return await comments.create({ _id: id, Name: body.Name, UserName: body.UserName, Time: body.Time, Description: body.Description, Image: { data: file.buffer, contentType: file.mimetype } })
}

// Image: {
//     data: req.file.buffer,
//     contentType: req.file.mimetype
//   }

async function updateComment(id, body) {

    return await (comments.findById(id).then(comment => {
        comment.Time = body.Time
        comment.Description = body.Description
        comment.save();
    })
    )
}

async function deleteComment(id) {
    return await comments.findByIdAndDelete(id);
}

async function likeComment(body) {
    console.log(body)

    const comment = await comments.findById(body.comment);
    const userLiked = comment.Likes.includes(body.user);

    // Adding a new notification
    const notification = await notifications.find({}).sort({ '_id': -1 }).limit(1)
    const id = notification.length === 0 ? "00001" : ("00000" + String(parseInt(notification[0]._id) + 1)).slice(-4);
    await notifications.create({ _id: id, author: body.user, type: 'like', comment: body.comment, user: comment.user, status: 'unread' })

    // If the user has already liked the comment, remove their like. Otherwise, add a new like.
    return userLiked ? await
        comments.findOneAndUpdate(
            { _id: body.comment },
            { $pull: { Likes: body.user } },
            { new: true }
        ) : await
        comments.findOneAndUpdate(
            { _id: body.comment },
            { $push: { Likes: body.user } },
            { new: true }
        );
}