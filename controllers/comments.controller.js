const express = require("express");
const router = express.Router();
const commentServices = require("../services/comments.service");
const comment = require("../models/comments.model");
const { protect } = require("../middleware/authMiddleware");

router.get("/getComments", async (req, res) => {
    const results = {};

    try {
        results.results = await comment.aggregate(
            [
                {
                    $lookup:
                    {
                        from: "users",
                        localField: "user",
                        foreignField: "_id",
                        as: "_user"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "replies.user",
                        foreignField: "_id",
                        as: "_ReplyUser"
                    }
                },
                {
                    $lookup:
                    {
                        from: "likes",
                        localField: "Likes",
                        foreignField: "_id",
                        as: "_likes"
                    }
                },
                {
                    $addFields: {
                        user: { $arrayElemAt: ['$_user', 0] },
                        // replyUser: { $arrayElemAt: ['$_ReplyUser', 0] },
                    }
                },
                {
                    $project: {
                        'user.Password': 0,
                        'user.token': 0
                    }
                },
                {
                    $project: {
                        'replies._ReplyUser.Password': 0,
                        'replies._ReplyUser.token': 0
                    }
                },
                {
                    $sort: {
                        'Time': -1
                    }
                }
            ]).exec()
        results.count = await comment.count()
        res.json(results);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
    }
});

router.get("/getCommentsById/:id", protect, (req, res) => {
    commentServices
        .getCommentByID(req.params.id)
        .then((comment) => res.json(comment))
        .catch((err) => res.status(400).json({ error: err }));
});

router.post("/addComment", (req, res) => {
    console.log(req.body);
    commentServices
        .addComment(req.body)
        .then(() => res.json("Comment Added"))
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.put("/updateComment/:id", (req, res) => {
    commentServices
        .updateComment(req.params.id, req.body)
        .then(() => res.json("Comment Updated"))
        .catch((err) => res.status(400).json({ error: err }));
});

router.delete("/deleteComment/:id", (req, res) => {
    commentServices
        .deleteComment(req.params.id)
        .then(() => res.json("Comment Deleted"))
        .catch((err) => res.status(400).json({ error: err }));
});

router.post("/likeComment", (req, res) => {
    console.log(req.body);
    commentServices.likeComment(req.body)
        .then((x) => res.json({ message: "Like Added", data: x }))
        .catch(err => { console.log(err); res.status(500).json({ error: err }) });
});

module.exports = router;