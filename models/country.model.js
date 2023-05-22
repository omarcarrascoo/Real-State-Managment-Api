const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema(
    {
        countryName : {type: String, required: true, unique: true},
        imgRoute: {type: String},
        urlCountry: {type: String},
        h1: {type: String},
        h2: {type: String},
        p: {type: String},
        keyWords: {type: String},
        longDescription: {type: String},
    },
    {timestamps: true}
);
module.exports = mongoose.model("Country", countrySchema);