const mongoose = require('mongoose');

const IsVotedSchema = new mongoose.Schema({
    voterId: { type: String, required: true, unique: true }, // Ensure unique voter ID
    votes: [{
        CandidateName: { type: String, required: true },
        Position: { type: String, required: true }
    }]
}, { timestamps: true });

module.exports = mongoose.model('ISVoted', IsVotedSchema);
