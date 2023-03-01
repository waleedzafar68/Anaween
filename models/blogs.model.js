const mongoose = require('mongoose');
const blogsSchema = new mongoose.Schema({
    _id: { type: String, required: false },
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    Image: { type: String, required: true }

})

const blog = mongoose.model('blogs', blogsSchema);

module.exports = blog;