
const likes = require('../models/likes.model')
const comments = require('../models/comments.model')

module.exports = {
    getLikes,
    getLikesByCommentID,
    getLikesByUserID,
    addLike,
    deleteLike,
}

async function getLikes() {
    return await likes.find().sort({ _id: -1 })
}

async function getLikesByCommentID(id) {
    return await likes.find({ comment: id });
}

async function getLikesByUserID(id) {
    return await likes.find({ user: id });
}

async function addLike(body) {
    console.log(body)
    const like = await likes.find({}).sort({ '_id': -1 }).limit(1);

    const updatedComment = await comments.findOneAndUpdate(
        { _id: body.comment },
        { $push: { Likes: body.user } },
        { new: true }
    );

    console.log(updatedComment);

    const id = like.length === 0 ? "00001" : ("00000" + String(parseInt(like[0]._id) + 1)).slice(-4);

    return await likes.create({ _id: id, ...body });
}

async function deleteLike(id) {
    return await likes.findByIdAndDelete(id)
}
