const express = require("express");
const router = express.Router();
const unitTypeServices = require('../services/unitTypes.service');
const unitType = require('../models/unitTypes.model');
const pagination = require('../middleware/pagination');
const { protect } = require('../middleware/authMiddleware');

router.get("/getUnitTypes", pagination(unitType), (req, res) => {
    // unitTypeServices.getUnitTypes()
    //     .then(unitTypes => res.json(unitTypes))
    //     .catch(err => { console.log(err); res.status(400).json({ error: err }) });
    res.json(res.paginatedResults);

});

router.get("/getUnitTypeByID/:id", protect, (req, res) => {
    unitTypeServices.getUnitTypeByID(req.params.id)
        .then(unitType => res.json(unitType))
        .catch(err => res.status(400).json({ error: err }));
});

router.post("/addUnitType", (req, res) => {
    unitTypeServices.addUnitType(req.body)
        .then((x) => res.json({ message: "Unit Type Added", data: x }))
        .catch(err => { console.log(err); res.status(500).json({ error: err }) });
});

router.put("/updateUnitType/:id", protect, (req, res) => {
    unitTypeServices.updateUnitType(req.params.id, req.body)
        .then(() => res.json("Unit Type Updated"))
        .catch(err => res.status(400).json({ error: err }));
});

router.delete("/deleteUnitType/:id", protect, (req, res) => {
    unitTypeServices.deleteUnitType(req.params.id)
        .then(() => res.json("Unit Type Deleted"))
        .catch(err => res.status(400).json({ error: err }));
});

module.exports = router;