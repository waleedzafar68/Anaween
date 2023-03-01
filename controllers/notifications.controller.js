const express = require("express");
const router = express.Router();
const notification = require('../models/notifications.model');
const { protect } = require('../middleware/authMiddleware');

router.get("/getNotificationsByUserId/:id", async (req, res) => {
    const results = {};

    try {
        results.results = await notification.aggregate([
            {
                $match: {
                    user: req.params.id
                }
            },
            {
                $lookup:
                {
                    from: "replies",
                    localField: "reply",
                    foreignField: "_id",
                    as: "reply"
                }
            },
            {
                $lookup:
                {
                    from: "comments",
                    localField: "comment",
                    foreignField: "_id",
                    as: "comment"
                }
            },
            {
                $lookup:
                {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "author"
                }
            },
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
                    user: { $arrayElemAt: ['$user', 0] },
                    author: { $arrayElemAt: ['$author', 0] },
                    comment: { $arrayElemAt: ['$comment', 0] },
                    reply: { $arrayElemAt: ['$reply', 0] }
                }
            },
            {
                $project: {
                    'user.Password': 0,
                    'user.token': 0,
                    'author.Password': 0,
                    'author.token': 0
                }
            },
            {
                $sort: {
                    'Date': -1
                }
            }
        ]).exec()
        results.count = await notification.count()
        res.json(results);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
    }
});

router.put('/updateNotificationStatus/:id', async (req, res) => {
    const { id } = req.params;
    console.log("Called", id, req.body);
    // try {
    //     console.log("Called", id, body);
    //     const notification = await notification.findById(id);
    //     if (!notification) {
    //         throw new Error('User not found');
    //     }
    //     notification.status = 'read';
    //     await notification.save();
    //     return notification;
    // } catch (error) {
    //     console.error(error);
    //     throw new Error('Failed to update notification status');
    // }

    try {
        notification.updateMany({ user: id }, { status: 'read' })
            .then((result) => {
                console.log(`${result.modifiedCount} notifications updated`);
                res.status(200).json({ message: `${result.modifiedCount} ${result.modifiedCount > 1 ? 'notifications' : 'notification'} updated` })
            }).catch((err) => {
                console.log(`Error updating notifications: ${err}`);
            });
    } catch (err) {
        console.log(err);
        throw new Error('Failed to update notification status');
    }

    // notification.findOneAndUpdate(
    //     { _id: documentId }, // query to find the document
    //     { $set: { status: 'read' } }, // update the status field to 'read'
    //     { new: true } // return the updated document
    // )
})

router.delete("/deleteNotification/:id", protect, (req, res) => {
    notification.findByIdAndDelete(req.params.id)
        .then(() => res.json("Notification deleted."))
        .catch(err => res.status(400).json({ error: err }));
});

module.exports = router;