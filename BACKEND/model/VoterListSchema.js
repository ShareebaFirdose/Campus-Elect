const mongoose = require("mongoose");

const VoterListSchema = new mongoose.Schema({
    name: { type: String, required: true },
    Id: { type: String, required: true },
    PhoneNumber: { type: String, required: true, validate: /^[0-9]{10}$/ },
    Email: { 
        type: String, 
        required: true, 
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|edu)$/, "Please enter a valid .com or .edu email address"]
    },
    Course: { type: String, required: true },
    Year: { type: String, required: true },
    Semester: { type: String, required: true },
    Gender: { type: String, required: true }
}, {
    collection: "VoterList"
});

module.exports = mongoose.model("VoterList", VoterListSchema);
