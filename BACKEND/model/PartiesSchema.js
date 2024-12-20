const mongoose = require("mongoose");

const PartiesSchema = new mongoose.Schema({
    Position: { type: String, required: true }, // Required
    CandidateName: { type: String, required: true }, // Required
    Image: { type: String, required: true }, // Required
}, {
    collection: "Parties",
});

module.exports = mongoose.model("Parties", PartiesSchema);
