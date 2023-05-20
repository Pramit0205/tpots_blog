const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = mongoose.Schema({
    userId: { type: ObjectId, ref: 'user', required: true, trim: true },
    name: { type: String, require: true, trim: true },
    description: { type: String, require: true, trim: true }
}, {
    timestamps: true
})

module.exports = mongoose.model("blog", blogSchema)