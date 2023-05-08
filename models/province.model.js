const mongoose = require("mongoose");

const provinceSchema = new mongoose.Schema(
    {
        provinceName : {type: String, required: true, unique: true},
        country : {type: String}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Province", provinceSchema);