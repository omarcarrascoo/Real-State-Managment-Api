const mongoose = require("mongoose")

const categoryPageSchema = new mongoose.Schema(
    {
        lenguage : {type: String, required: true,},
        urlCountry: {type: String},
        urlProvince: {type: String},
        urlCity: {type: String},
        categoryTitle: {type: String, required: true},
        h1: {type: String, required: true},
        h2: {type: String, required: true},
        p: {type: String, required: true},
        urlCategory: {type: String, required: true, unique: true},
    },
    {timestamps: true}
)

module.exports = mongoose.model("CategoryPage", categoryPageSchema)