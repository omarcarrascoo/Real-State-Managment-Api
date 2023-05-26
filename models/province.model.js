const mongoose = require("mongoose");

const provinceSchema = new mongoose.Schema(
    {
        lenguage: {type: String},
        provinceName : {type: String, required: true, unique: true},
        country : {type: String},
        urlProvince: {type: String},
        h1: {type: String},
        h2: {type: String},
        p: {type: String},
        keyWords: {type: String},
        longDescription: {type: String},   
    },
    {timestamps: true}
);

module.exports = mongoose.model("Province", provinceSchema);