const blogs = require('../models/blogs.model');

module.exports = {
    getBlogs,
    getBlogByID,
    addBlog,
    updateBlog,
    deleteBlog,
}

async function getBlogs() {
    return await blogs.find().sort({ _id: -1 })
}

async function getBlogByID(id) {
    return await blogs.findById(id)
}

async function addBlog(body, file) {
    const Image = file && file.filename;
    const blog = await blogs.find({}).sort({ '_id': -1 }).limit(1)
    console.log(blog)
    const id = blog.length === 0 ? "00001" : ("00000" + String(parseInt(blog[0]._id) + 1)).slice(-4);
    return await blogs.create({ _id: id, Title: body.Title, Description: body.Description, Image })
}

async function updateBlog(id, body, file) {

    return await (blogs.findById(id).then(blog => {
        if (file) {
            blog.Title = body.Title
            blog.Description = body.Description
            blog.Image = file.filename;
        } else {
            blog.Title = body.Title
            blog.Description = body.Description
        }
        blog.save();
    })
    )
}

async function deleteBlog(id) {
    return await blogs.findByIdAndDelete(id);
}