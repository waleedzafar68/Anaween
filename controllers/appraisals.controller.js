const express = require("express");
const router = express.Router();
const appraisalServices = require("../services/appraisals.service");
const appraisal = require("../models/appraisals.model");
const pagination = require("../middleware/pagination");
const { protect } = require("../middleware/authMiddleware");

router.get("/getAppraisals", pagination(appraisal), (req, res) => {
    res.json(res.paginatedResults);
});

router.get("/getAppraisalsById/:id", protect, (req, res) => {
    appraisalServices
        .getAppraisalByID(req.params.id)
        .then((appraisal) => res.json(appraisal))
        .catch((err) => res.status(400).json({ error: err }));
});

router.post("/addAppraisal", (req, res) => {
    console.log(req.body);
    appraisalServices
        .addAppraisal(req.body)
        .then(() => res.json("Appraisal Added"))
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.put("/updateAppraisal/:id", (req, res) => {
    appraisalServices
        .updateAppraisal(req.params.id, req.body)
        .then(() => res.json("Appraisal Updated"))
        .catch((err) => res.status(400).json({ error: err }));
});

router.delete("/deleteAppraisal/:id", (req, res) => {
    appraisalServices
        .deleteAppraisal(req.params.id)
        .then(() => res.json("Appraisal Deleted"))
        .catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;