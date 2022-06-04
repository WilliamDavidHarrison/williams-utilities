const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    _id: String,
    member: String,
    warnings: Array
})

module.exports = mongoose.model("warnings", schema, "warnings")