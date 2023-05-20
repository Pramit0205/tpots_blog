const express = require("express")
    // const app = express()
const router = express.Router()
const { createBlogs, getAllBlogs, getBlogsById, updateBlog, deleteBlog } = require("../controller/blog")
const { authentication } = require("../middleware/auth")
const { createUser, login } = require("../controller/user")

router.post("/posts", authentication, createBlogs)
router.get("/posts", getAllBlogs)
router.get("/posts/:id", authentication, getBlogsById)
router.put("/posts/:id", authentication, updateBlog)
router.delete("/posts/:id", authentication, deleteBlog)



// user
router.post("/register", createUser)
router.post("/login", login)
module.exports = router