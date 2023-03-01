const mongoose = require('mongoose');

const appraisalSchema = new mongoose.Schema({
    _id: { type: String, required: false },
    Name: { type: String, required: true },
    Project_Developer: { type: String, field: "_id", ref: 'projectDeveloper' },
    AreaSize: { type: Number, required: false },
    Location: { type: String, field: "_id", ref: 'location' },
    BoughtFor: { type: Number, required: true },
    Type: { type: String, required: false },
    Property: { type: String, required: false },
    Description: { type: String, required: false },
    UserName: { type: String, required: true },
    Email: { type: String, required: false },
    Phone: { type: Number, required: true },
});

const appraisal = mongoose.model('appraisal', appraisalSchema);

module.exports = appraisal;