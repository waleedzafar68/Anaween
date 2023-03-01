const express = require("express");
const router = express.Router();
const replyServices = require("../services/replies.service");
const comments = require("../models/comments.model");
const replies = require("../models/replies.model");
const { protect } = require("../middleware/authMiddleware");

router.post('/addReply', async (req, res) => {
    const commentId = req.body.parentComment;
    console.log(commentId);
    console.log(req.body);
    replyServices
        .addReply(commentId, req.body)
        .then(() => res.json("Reply Added"))
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.delete('deleteReply/:commentId/:replyId', async (req, res) => {
    const { commentId, replyId } = req.params;
    const comment = await comments.findById(commentId);
    const reply = comment.replies.id(replyId);
    reply.remove();
    await reply.deleteOne({ _id: replyId }); // delete from database
    await comment.save();
    res.json({ message: 'Reply deleted' });
});


// comentShares

router.post('/comments/:commentId/replies/:replyId/share', async (req, res) => {
    const { commentId, replyId } = req.params;
    const reply = await replies.findById(replyId);
    if (!reply || !reply.parentComment.equals(commentId)) {
        return res.status(404).json({ message: 'Reply not found' });
    }
    reply.shares += 1;
    await reply.save();
    res.json(reply);
});

module.exports = router;