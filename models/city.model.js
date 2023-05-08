const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
    {
        cityName : {type: String, required: true, unique: true},
        province: {type: String},
        country : {type: String}
    },
    {timestamps: true}
);

module.exports = mongoose.model("City", citySchema);