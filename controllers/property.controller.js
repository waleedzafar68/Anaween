const express = require("express");
const router = express.Router();
const propertyServices = require("../services/property.service");
const property = require("../models/property.model");
const pagination = require("../middleware/pagination");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");


router.get("/searchProperty", async (req, res) => {
    // console.log(req.query);
    // propertyServices.search(req.query.location, req.query.projectDeveloper, req.query.type, req.query.price, req.query.unitType).
    const page = req.query?.page ? parseInt(req.query.page) < 1 ? 1 : parseInt(req.query.page) : 1;
    const limit = req.query?.limit ? parseInt(req.query.limit) : 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {}
    if (endIndex < await property.countDocuments().exec()) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }
    // let queryCond = {}
    // if (req.query.name) {
    //     queryCond.Name = { '$regex': req.query.name + '.*', '$options': 'i' };
    //     // queryCond.City = { '$regex': req.query.name + '.*', '$options': 'i' };
    //     // queryCond.State = { '$regex': req.query.name + '.*', '$options': 'i' };
    // }
    // if (req.query.location) {
    //     queryCond.Location = req.query.location;
    // }
    // if (req.query.property) {
    //     queryCond.Property = { '$regex': req.query.property + '.*', '$options': 'i' };
    // }
    // if (req.query.price) {
    //     queryCond.Price = { '$lte': Number(req.query.price) }
    // }
    // if (req.query.installmentYears) {
    //     queryCond.InstallmentYears = { '$lte': req.query.installmentYears };
    // }
    // if (req.query.type) {
    //     queryCond.Type = { '$regex': req.query.type + '.*', '$options': 'i' };
    // }
    // if (req.query.unitType) {
    //     queryCond["Unit_PropertyType.UnitType"] = req.query.unitType;
    // }
    // if (req.query.deliveryDate) {
    //     queryCond.Delivery = { '$lte': req.query.deliveryDate };
    // }
    // if (req.query.amenities) {
    //     queryCond["Amenities"] = { '$in': req.query.amenities.map(id => mongoose.Types.ObjectId(id)) }
    // }

    // if (req.query.location === null && req.query.type === null && req.query.name === null && req.query.price === null && req.query.installmentYears === null && req.query.unitType === null && req.query.deliveryDate === null && req.query.amenities === null) {
    //     console.log(await property.count(), "Results count")

    //     results.results = await property.find().limit(limit).skip(startIndex).exec()
    //     results.count = await property.count()
    // }
    // else {
    //     console.log(await property.count(queryCond), "Results count")

    //     results.results = await property.find(queryCond)
    //         .limit(limit).skip(startIndex).exec()
    //     results.count = await property.count(queryCond)

    // }
    // res.json(results)
    console.log(req.query);
    try {
        results.results = await property.aggregate([
            {
                $match: {
                    $and: [
                        req.query.name ? { Name: { $regex: req.query.name + '.*', $options: 'i' } } : {},
                        req.query.price ? { Price: { $lte: Number(req.query.price) } } : {},
                        req.query.location ? { Location: req.query.location } : {},
                        req.query.property ? { Property: { $regex: req.query.property + '.*', $options: 'i' } } : {},
                        req.query.installmentYears ? { InstallmentYears: { $lte: Number(req.query.installmentYears) } } : {},
                        req.query.type ? { Type: { $regex: req.query.type + '.*', $options: 'i' } } : {},
                        req.query.deliveryDate ? { Delivery: { $lte: req.query.deliveryDate } } : {},
                        req.query.amenities ? { Amenities: { $in: req.query.amenities } } : {},
                        req.query.unitType ? { Unit_PropertyType: { $elemMatch: { UnitType: req.query.unitType } } } : {}
                    ]
                }
            },
            {
                $lookup: {
                    from: "amenities",
                    localField: "Amenities",
                    foreignField: "_id",
                    as: "_Amenities",
                },
            },
            {
                $lookup: {
                    from: "developers",
                    localField: "Project_Developer",
                    foreignField: "_id",
                    as: "_ProjectDeveloper",
                },
            },
            {
                $lookup: {
                    from: "locations",
                    localField: "Location",
                    foreignField: "_id",
                    as: "_Location",
                },
            },
            { $limit: limit }
        ]).exec()
        results.count = await property.count()
        console.log(results)
        res.json(results);
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: e.message });
    }

});


router.get("/getProperties", async (req, res) => {

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {}
    if (endIndex < await property.countDocuments().exec()) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }
    try {
        results.results = await property.aggregate([
            { $skip: startIndex },
            {
                $lookup: {
                    from: "amenities",
                    localField: "Amenities",
                    foreignField: "_id",
                    as: "_Amenities",
                },
            },
            {
                $lookup: {
                    from: "developers",
                    localField: "Project_Developer",
                    foreignField: "_id",
                    as: "_ProjectDeveloper",
                },
            },
            {
                $lookup: {
                    from: "location",
                    localField: "Location",
                    foreignField: "_id",
                    as: "_Location",
                },
            },
            {
                $addFields: {
                    _ProjectDeveloper: { $arrayElemAt: ['$_ProjectDeveloper', 0] },
                }
            },
            { $limit: limit }
        ]).exec()
        results.count = await property.count()
        console.log(results)
        res.json(results);
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: e.message });
    }       // .then((properties) => { console.log(properties); res.json(properties) })
    // .catch((err) => {
    //     console.log(err);
    //     res.status(400).json({ error: err });
    // });
    // res.json(res.paginatedResults);
});

router.get("/getProperty/:id", (req, res) => {
    console.log("Hello world", req.params.id)
    //   propertyServices
    //     .getPropertyByID(req.params.id)
    property.aggregate([
        {
            $match: {
                _id: `${req.params.id}`
            }
        },
        {
            $lookup: {
                from: "amenities",
                localField: "Amenities",
                foreignField: "_id",
                as: "_Amenities",
            },
        },
        {
            $lookup: {
                from: "developers",
                localField: "Project_Developer",
                foreignField: "_id",
                as: "_ProjectDeveloper",
            },
        },
        {
            $lookup: {
                from: "locations",
                localField: "Location",
                foreignField: "_id",
                as: "_Location",
            },
        },
        {
            $addFields: {
                _ProjectDeveloper: { $arrayElemAt: ['$_ProjectDeveloper', 0] },
            }
        },

    ])
        .then((property) => { console.log(property); res.json({ results: property }) })
        .catch((err) => res.status(400).json({ error: err }));
});

router.get("/getPropertiesByUserId", (req, res) => {
    console.log("Hello world", req.query.userId)
    //   propertyServices
    //     .getPropertyByID(req.params.id)
    property.aggregate([
        {
            $match: {
                User: `${req.query.userId}`
            }
        },
        {
            $lookup: {
                from: "amenities",
                localField: "Amenities",
                foreignField: "_id",
                as: "_Amenities",
            },
        },
        {
            $lookup: {
                from: "projectDevelopers",
                localField: "Project_Developer",
                foreignField: "_id",
                as: "_ProjectDeveloper",
            },
        },
        {
            $lookup: {
                from: "location",
                localField: "Location",
                foreignField: "_id",
                as: "_Location",
            },
        },

    ])
        .then((properties) => { console.log(properties); res.json(properties) })
        .catch((err) => res.status(400).json({ error: err }));
});

router.post("/addProperty", upload.array("SelectedImages", 5), (req, res) => {
    propertyServices
        .addProperty(req.body, req.files)
        .then(() => res.json("Property Added"))
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.put("/updateProperty/:id", upload.array("SelectedImages", 5), (req, res) => {
    propertyServices
        .updateProperty(req.params.id, req.body, req.files)
        .then(() => res.json("Property Updated"))
        .catch((err) => res.status(400).json({ error: err }));
});
router.delete("/deleteProperty/:id", (req, res) => {
    propertyServices
        .deleteProperty(req.params.id)
        .then(() => res.json("Property Deleted"))
        .catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;