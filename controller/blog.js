const blogModel = require("../model/blog")

const createBlogs = async function(req, res) {
    try {
        const data = req.body
        if (data) {
            if (data.userId.toString() !== req.decodedToken.id) {
                return res.status(401).send({ error: true, message: "you are not authorized to access this data" })
            }
            let blog = await blogModel.create(data)
            res.status(201).send({ error: false, message: "blog is created", data: blog })
        } else {
            res.status(201).send({ error: true, message: "enter some data in body to create blogs", data: blog })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "server error", error: err })
    }
}

const getAllBlogs = async(req, res) => {
    try {
        let allBlogs = await blogModel.find()
        res.status(200).send({ error: false, message: "list of all data", data: allBlogs })
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: true, message: "server error", error: err })
    }
}

const getBlogsById = async(req, res) => {
    try {
        const id = req.params.id;

        const blogById = await blogModel.findById(id).lean()
        if (blogById) {
            if (blogById.userId.toString() !== req.decodedToken.id) {
                return res.status(401).send({ error: true, message: "you are not authorized to access this data" })
            }
            res.status(200).send({ error: false, message: "your blog", data: blogById })
        } else {
            res.status(200).send({ error: false, message: "no blogs found with this id", data: null })
        }


    } catch (err) {
        console.log(err)
        res.status(500).send({ error: true, message: "server error", error: err })
    }
}

const updateBlog = async(req, res) => {
    try {
        let id = req.params.id
        let data = req.body
        const blogById = await blogModel.findById(id).lean()
        if (blogById.userId.toString() !== req.decodedToken.id) {
            return res.status(401).send({ error: true, message: "you are not authorized to access this data" })
        }
        const updateBlog = await blogModel.findByIdAndUpdate(id, data, { upsert: true, new: true })
        res.status(200).send({ error: false, message: "blog is updated", data: updateBlog })
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: true, message: "server error", error: err })
    }
}

const deleteBlog = async(req, res) => {
    try {
        let id = req.params.id
        const blogById = await blogModel.findById(id).lean()
        if (blogById.userId.toString() !== req.decodedToken.id) {
            return res.status(401).send({ error: true, message: "you are not authorized to access this data" })
        }
        await blogModel.findByIdAndDelete(id)
        res.status(200).send({ error: false, message: "blog is deleted", data: null })
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: true, message: "server error", error: err })
    }
}
module.exports = { createBlogs, getAllBlogs, getBlogsById, updateBlog, deleteBlog }