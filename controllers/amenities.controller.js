const express = require("express");
const router = express.Router();
const amenityServices = require("../services/amenities.service");
const amenity = require("../models/amenities.model");
const pagination = require("../middleware/pagination");
const { protect } = require("../middleware/authMiddleware");

router.get("/getAmenities", pagination(amenity), (req, res) => {
  // amenityServices.getAmenities()
  //     .then(amenities => res.json(amenities))
  //     .catch(err => { console.log(err); res.status(400).json({ error: err }) });
  res.json(res.paginatedResults);
});

router.get("/getAmenitiesById/:id", protect, (req, res) => {
  amenityServices
    .getAmenityByID(req.params.id)
    .then((amenity) => res.json(amenity))
    .catch((err) => res.status(400).json({ error: err }));
});

router.post("/addAmenity", (req, res) => {
  amenityServices
    .addAmenity(req.body)
    .then(() => res.json("Amenity Added"))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.put("/updateAmenity/:id", protect, (req, res) => {
  amenityServices
    .updateAmenity(req.params.id, req.body)
    .then(() => res.json("Amenity Updated"))
    .catch((err) => res.status(400).json({ error: err }));
});

router.delete("/deleteAmenity/:id", protect, (req, res) => {
  amenityServices
    .deleteAmenity(req.params.id)
    .then(() => res.json("Amenity Deleted"))
    .catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;
