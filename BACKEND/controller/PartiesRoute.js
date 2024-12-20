const express = require("express");
const PartiesSchema = require("../model/PartiesSchema");
const PartiesRoute = express.Router();
const mongoose = require("mongoose");

// To Read the Data
PartiesRoute.get("/", (req, res) => {
    PartiesSchema.find((err, data) => {
        if (err) return res.status(500).json({ error: "Failed to retrieve parties." });
        res.json(data);
    });
});

// To add the Data to the database
PartiesRoute.post("/AddParty", (req, res) => {
    const { Position, CandidateName, Image } = req.body; // Destructure for clarity
    if (!Position || !CandidateName || !Image) {
        return res.status(400).json({ error: "All fields are required." }); // Return 400 if validation fails
    }
    PartiesSchema.create(req.body, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to add party" });
        }
        return res.status(200).json(data); // Return 200 OK on success
    });
});

// To update the Data
PartiesRoute.route("/update-Party/:id")
    .get((req, res) => {
        PartiesSchema.findById(mongoose.Types.ObjectId(req.params.id), (err, data) => {
            if (err) return res.status(500).json({ error: "Failed to retrieve party." });
            res.json(data);
        });
    })
    .put((req, res) => {
        PartiesSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
            { $set: req.body },
            (err, data) => {
                if (err) return res.status(500).json({ error: "Failed to update party." });
                res.json(data);
            });
    });

// To delete Voter
PartiesRoute.delete("/delete-Party/:id", (req, res) => {
    PartiesSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id), (err, data) => {
        if (err) return res.status(500).json({ error: "Failed to delete party." });
        res.json(data);
    });
});

// Count
PartiesRoute.get('/Parties-count', (req, res) => {
    PartiesSchema.countDocuments({}, (err, count) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while counting parties.' });
        }
        res.json({ count });
    });
});

module.exports = PartiesRoute;
