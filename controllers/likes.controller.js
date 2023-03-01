const express = require("express");
const router = express.Router();
const likes = require('../services/likes.service');
const like = require('../models/likes.model');
const { protect } = require('../middleware/authMiddleware');

router.get("/getLikes", async (req, res) => {
    const results = {};

    try {
        results.results = await like.aggregate(
            [
                {
                    $lookup:
                    {
                        from: "users",
                        localField: "user",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    $addFields: {
                        user: { $arrayElemAt: ['$user', 0] }
                    }
                },
                {
                    $project: {
                        'user.Password': 0,
                        'user.token': 0
                    }
                },
                // {
                //     $sort: {
                //         'Time': -1
                //     }
                // }
            ]).exec()
        results.count = await like.count()
        res.json(results);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
    }
});

router.get("/getLikeBylikeID/:id", protect, (req, res) => {
    likes.getLikesBylikeID(req.params.id)
        .then(like => res.json(like))
        .catch(err => res.status(400).json({ error: err }));
});

router.get("/getLikesByUserID/:id", protect, (req, res) => {
    likes.getLikesByUserID(req.params.id)
        .then(like => res.json(like))
        .catch(err => res.status(400).json({ error: err }));
});

router.post("/addLike", (req, res) => {
    console.log(req.body);
    likes.addLike(req.body)
        .then((x) => res.json({ message: "Like Added", data: x }))
        .catch(err => { console.log(err); res.status(500).json({ error: err }) });
});

router.delete("/deleteLike/:id", protect, (req, res) => {
    likes.deleteLike(req.params.id)
        .then(() => res.json("Like Deleted"))
        .catch(err => res.status(400).json({ error: err }));
});

module.exports = router;