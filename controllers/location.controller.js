const express = require("express");
const router = express.Router();
const locationServices = require('../services/location.service');
const location = require('../models/location.model');
const pagination = require('../middleware/pagination')
const { protect } = require('../middleware/authMiddleware');

router.get("/getLocations", pagination(location), (req, res) => {
    // locationServices.getLocations()
    //     .then(locations => res.json(locations))
    //     .catch(err => { console.log(err); res.status(400).json({ error: err }) });
    res.json(res.paginatedResults);

});

router.get("/getLocationsById/:id", protect, (req, res) => {
    locationServices.getLocationByID(req.params.id)
        .then(location => res.json(location))
        .catch(err => res.status(400).json({ error: err }));
});

router.post("/addLocation", (req, res) => {
    locationServices.addLocation(req.body)
        .then(() => res.json("Location Added"))
        .catch(err => { console.log(err); res.status(500).json({ error: err }) });
});

router.put("/updateLocation/:id", protect, (req, res) => {
    locationServices.updateLocation(req.params.id, req.body)
        .then(() => res.json("Location Updated"))
        .catch(err => res.status(400).json({ error: err }));
});

router.delete("/deleteLocation/:id", protect, (req, res) => {
    locationServices.deleteLocation(req.params.id)
        .then(() => res.json("Location Deleted"))
        .catch(err => res.status(400).json({ error: err }));
});

module.exports = router;