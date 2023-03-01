const express = require("express");
const router = express.Router();
const contactServices = require('../services/contact.service');
const contact = require('../models/contact.model');
const pagination = require('../middleware/pagination');
const { protect } = require('../middleware/authMiddleware');

router.get("/getContacts", pagination(contact), (req, res) => {
    // amenityServices.getAmenities()
    //     .then(amenities => res.json(amenities))
    //     .catch(err => { console.log(err); res.status(400).json({ error: err }) });
    res.json(res.paginatedResults);
});

router.get("/getContactById/:id", protect, (req, res) => {
    contactServices.getContactByID(req.params.id)
        .then(contact => res.json(contact))
        .catch(err => res.status(400).json({ error: err }));
});

router.post("/addContact", (req, res) => {
    console.log(req.body)
    contactServices.addContact(req.body)
        .then(() => res.json("Contact Added"))
        .catch(err => { console.log(err); res.status(500).json({ error: err }) });
});

router.put("/updateContact/:id", protect, (req, res) => {
    contactServices.updateContact(req.params.id, req.body)
        .then(() => res.json("Contact Updated"))
        .catch(err => res.status(400).json({ error: err }));
});

router.delete("/deleteContact/:id", (req, res) => {
    contactServices.deleteContact(req.params.id)
        .then(() => res.json("Contact Deleted"))
        .catch(err => res.status(400).json({ error: err }));
});

module.exports = router;