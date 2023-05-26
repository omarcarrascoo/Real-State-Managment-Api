const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema(
    {
        lenguage : {type: String, required: true, unique: true},
        categoryTitle: {type: String, required: true, unique: true},
        h1: {type: String, required: true, unique: true},
        h2: {type: String, required: true, unique: true},
        p: {type: String, required: true, unique: true},
        urlCategory: {type: String, required: true, unique: true},
    },
    {timestamps: true}
)

module.exports = mongoose.model("Category", categorySchema)