const express = require("express");
const router = express.Router();
const blogServices = require("../services/blogs.service");
const blog = require("../models/blogs.model");
const pagination = require("../middleware/pagination");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.get("/getBlogs", pagination(blog), (req, res) => {
    res.json(res.paginatedResults);
});

router.get("/getBlogsById/:id", protect, (req, res) => {
    blogServices
        .getBlogByID(req.params.id)
        .then((blog) => res.json(blog))
        .catch((err) => res.status(400).json({ error: err }));
});

router.post("/addBlog", upload.single('Image'), (req, res) => {
    blogServices
        .addBlog(req.body, req.file)
        .then(() => res.json("Blog Added"))
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.put("/updateBlog/:id", upload.single('Image'), (req, res) => {
    blogServices
        .updateBlog(req.params.id, req.body, req.file)
        .then(() => res.json("Blog Updated"))
        .catch((err) => res.status(400).json({ error: err }));
});

router.delete("/deleteBlog/:id", (req, res) => {
    blogServices
        .deleteBlog(req.params.id)
        .then(() => res.json("Blog Deleted"))
        .catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;