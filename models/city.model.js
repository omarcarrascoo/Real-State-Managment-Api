const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
    {
        cityName : {type: String, required: true, unique: true},
        province: {type: String},
        country : {type: String},
        urlCity: {type: String},
        h1: {type: String},
        h2: {type: String},
        p: {type: String},
        keyWords: {type: String},
        longDescription: {type: String}
    },
    {timestamps: true}
);

module.exports = mongoose.model("City", citySchema);