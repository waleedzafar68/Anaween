const express = require("express");
const router = express.Router();
const developerServices = require('../services/developer.service');
const developer = require('../models/developer.model');
const pagination = require("../middleware/pagination")
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get("/getProjectDevelopers", pagination(developer), (req, res) => {
    // developerServices.getProjectDevelopers()
    //     .then(projectDeveloper => res.json(projectDeveloper))
    //     .catch(err => { console.log(err); res.status(400).json({ error: err }) });
    res.json(res.paginatedResults);
});

router.get("/getProjectDeveloperByID/:id", protect, (req, res) => {
    developerServices.getProjectDeveloperByID(req.params.id)
        .then(projDeveloper => res.json(projDeveloper))
        .catch(err => res.status(400).json({ error: err }));
});

router.post("/addProjectDeveloper", upload.array("SelectedImages", 5), (req, res) => {
    console.log(req.files)
    developerServices.addProjectDeveloper(req.body, req.files)
        .then(() => res.json("Project Developer Added"))
        .catch(err => { console.log(err); res.status(500).json({ error: err }) });
});

router.put("/updateProjectDeveloper/:id", protect, (req, res) => {
    developerServices.updateProjectDeveloper(req.params.id, req.body)
        .then(() => res.json("Project Developer Updated"))
        .catch(err => res.status(400).json({ error: err }));
});

router.delete("/deleteProjectDeveloper/:id", protect, (req, res) => {
    developerServices.deleteProjectDeveloper(req.params.id)
        .then(() => res.json("Project Developer Deleted"))
        .catch(err => res.status(400).json({ error: err }));
});

module.exports = router;