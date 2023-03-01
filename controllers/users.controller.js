const express = require("express");
const router = express.Router();
const pagination = require("../middleware/pagination")
const userServices = require('../services/users.service');
const users = require('../models/users.model')
const { protect } = require('../middleware/authMiddleware');
const upload = require("../middleware/upload");


router.get("/getUsers", pagination(users), (req, res) => {
    // console.log(res, "response")
    res.json(res.paginatedResults);

    // userServices.getUsers()
    //     .then(users => res.json(users))
    //     .catch(err => { console.log(err); res.status(400).json({ error: err }) });
});

router.post("/Authenticate", (req, res) => {
    userServices.Authenticate(req.body)
        .then(user => { console.log(user); res.json(user); })
        .catch(err => res.status(400).json({ error: err }));
});

router.post("/addUser", upload.single('Image'), (req, res) => {
    userServices.addUser(req.body, req.file)
        .then((user) => { res.json({ isPro: user.isPro, userId: user._id }); console.log(user._id) })
        .catch(err => { console.log(err); res.status(500).json({ error: err }) });
});

router.put("/updateUser/:id", upload.single('Image'), protect, (req, res) => {
    userServices.updateUser(req.params.id, req.body, req.file)
        .then(() => res.json("User Updated"))
        .catch(err => res.status(400).json({ error: err }));
});

router.put('/updateUserStatus/:id', (req, res) => {
    userServices.updateUserStatus(req.params.id, req.body)
        .then(() => res.json("User Status Updated"))
        .catch(err => res.status(400).json({ error: err }));
})

router.delete("/deleteUser/:id", (req, res) => {
    userServices.deleteUser(req.params.id)
        .then(() => res.json("User Deleted"))
        .catch(err => res.status(400).json({ error: err }));
});

router.get("/getUser/:id", (req, res) => {
    userServices
        .getUserById(req.params.id)
        .then((user) => { res.json({ results: user }) })
        .catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;