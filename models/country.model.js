const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema(
    {
        countryName : {type: String, required: true, unique: true},
        imgRoute: {type: String}
    },
    {timestamps: true}
);
module.exports = mongoose.model("Country", countrySchema);